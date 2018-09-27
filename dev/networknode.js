/**
*author: @maheshjindal
*
*
*
*
**/


const express = require('express');
const Blockchain = require('./blockchain.js');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const uuid = require('uuid/v1');
const nodeAddress = uuid().split('-').join('');
const port = process.argv[2];
const bitcoin = new Blockchain();
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get('/blockchain',(req,res)=>{
  res.send(bitcoin);
});

app.post('/transaction',(req,res)=>{
  const newTransaction = req.body;
  const blockInd = bitcoin.addTransactionToPendingTransactions(newTransaction);
  res.json({note:`Transaction will be added in block ${blockInd}`});
  });

  app.post('/transaction/broadcast',(req,res)=>{
    const newTransaction = bitcoin.createNewTransaction(req.body.amount,req.body.sender,req.body.recipient);
    bitcoin.addTransactionToPendingTransactions(newTransaction);
    const requestPromises = [];
    console.log(bitcoin.networkNodes);
    bitcoin.networkNodes.forEach(networkNodeURL=>{
        const requestOptions = {
          uri: networkNodeURL + "/transaction",
          method:"POST",
          body:newTransaction,
          json:true
        };
        console.log(requestOptions.body);
        requestPromises.push(rp(requestOptions));
    });

    Promise.all(requestPromises)
    .then(data=>{
      res.json({note: 'Transaction created and broadcast successfully'});
    })
    .catch(err=>{
      //console.log(err);
    });
  });


app.get('/mine',(req,res) => {
  const lastBlock = bitcoin.getLastBlock();
  const prevBlockHash = lastBlock["hash"];
  const currBlockData = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock['index'] + 1
  };
  bitcoin.createNewTransaction(12.5,"00",nodeAddress);
  const nonce = bitcoin.proofOfWork(prevBlockHash,currBlockData);
  const blockHash = bitcoin.hashBlock(prevBlockHash,currBlockData,nonce);
  const newblock = bitcoin.createNewBlock(nonce,prevBlockHash,blockHash);
  const requestPromises = [];
  bitcoin.networkNodes.forEach(networkNodeURL=>{
    const requestOptions = {
      uri: networkNodeURL + '/recieve-new-block',
      method: 'POST',
      body: {newBlock: newblock},
      json: true
    };
    requestPromises.push(rp(requestOptions));
  });
  //console.log(`Request promises are ${requestPromises}`)
  Promise.all(requestPromises)
  .then(data=>{
    const requestOptions = {
      uri: bitcoin.currentNodeURL + '/transaction/broadcast',
      method:'POST',
      body: {
        amount:12.5,
        sender:"00",
        recipient: nodeAddress
      },
      json: true
    };
    return rp(requestOptions);
  })
  .then(data=>{
    res.json({
      note:"New Block Mined and broadcasted Successfuly",
      block: newblock
    });
  })
  .catch(err=>{
    console.log(err);
  });

});

app.post('/recieve-new-block',(req,res)=>{
  const newBlock = req.boy.newBlock;
  const lastBlock = bitcoin.getLastBlock();
  if(lastBlock.hash === newBlock.previousBlockHash
    && lastBlock['index'] + 1 === newBlock[index]) {
      bitcoin.chain.push(newBlock);
      bitcoin.pendingTransactions = [];
      res.json({
        note: 'New Block recieved and accepted',
        newBlock : newBlock
      });
    } else {
      res.json({
        note: 'New Block rejected'
      });
    }
});

app.get('/consensus',(req,res)=>{
  let requestOptions = [];
  bitcoin.networkNodes.forEach((networkNodeURL)=>{
    const requestOptions = {
      uri: networkNodeURL+'/blockchain',
      method:'GET',
      json:true
    };
    requestPromises.push(rp(requestOptions));
  });
  Promise.all(requestPromises)
  .then(blockchains=>{
    const currentChainLength = bitcoin.chain.length;
    let maxChainLength = currentChainLength;
    let newLongestChain = null;
    let newPendingTransactions = null;
    blockchains.forEach(blockchain=>{
      if (blockchain.chain.length > maxChainLength) {
        maxChainLength = blockchain.chain.length;
        newLongestChain = blockchain.chain;
        newPendingTransactions = blockchain.pendingTransactions;
      };
    });
    if(!newLongestChain || (newLongestChain && !(bitcoin.chainIsValid(newLongestChain)))) {
      res.json({
        note: 'Current chain has not been relaced',
        chain: bitcoin.chain
      });
    }else if (newLongestChain && bitcoin.chainIsValid(newLongestChain)) {
      bitcoin.chain = newLongestChain;
      bitcoin.pendingTransactions = newPendingTransactions;
      res.json({
        note:"This chain has been replaced",
        chain: bitcoin.chain
      });
    }
  })
  .catch(err=>{
    console.log(err);
  });
});

app.post('/register-and-broadcast-node',(req,res)=>{
  const newNodeURL = req.body.newNodeURL;
  console.log(newNodeURL);
  const regNodesPromises = [];
  if(bitcoin.networkNodes.indexOf(newNodeURL) == -1) {
    bitcoin.networkNodes.push(newNodeURL);
  }
  console.log('reached');
    bitcoin.networkNodes.forEach((networkNodeURL)=>{
        const requestOptions = {
          uri: networkNodeURL + "/register-node",
          method:"POST",
          body:{newNodeURL: newNodeURL},
          json:true
        };
        regNodesPromises.push(rp(requestOptions));
    });
  Promise.all(regNodesPromises)
  .then(data=>{

    const bulkRegisterOptions = {
      uri: newNodeURL + "/register-nodes-bulk",
      method:"POST",
      body:{allNetworkNodes: [...bitcoin.networkNodes,bitcoin.currentNodeURL]},
      json:true
    };
    return rp(bulkRegisterOptions);

  })
  .then(data=>{
    res.json({note: 'New node registered with network successfully'});
  })
  .catch((err)=>{
    console.log("err");
  });
//res.json({'result':'done'});
});

app.post('/register-node',(req,res)=>{
  const newNodeURL = req.body.newNodeURL;
  if( newNodeURL !== bitcoin.currentNodeURL
        && bitcoin.networkNodes.indexOf(newNodeURL)==-1) {
    bitcoin.networkNodes.push(newNodeURL);
  }
      res.json({note:'New Node registered successfully'});
});

app.post('/register-nodes-bulk',(req,res)=>{
  const allNetworkNodesURL = req.body.allNetworkNodes;
  console.log(allNetworkNodesURL);
  allNetworkNodesURL.forEach(networkNodeURL=>{

    if( networkNodeURL !== bitcoin.currentNodeURL
          && bitcoin.networkNodes.indexOf(networkNodeURL)==-1) {
      bitcoin.networkNodes.push(networkNodeURL);
  }

});
  res.json({note:'Bulk registered successfully'});
});


app.listen(port,()=>{
  console.log(`Currently on port ${port}`);
});
