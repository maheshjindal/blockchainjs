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
  const blockInd = bitcoin.createNewTransaction(req.body.amount,req.body.sender,req.body.recipient);
  res.json({note:`Transaction will be added in block ${blockInd}`});
  });


app.get('/mine',(req,res) => {
  const lastBlock = bitcoin.getLastBlock();
  const prevBlockHash = lastBlock["hash"];
  const currBlockData = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock['index'] + 1
  };
  const nonce = bitcoin.proofOfWork(prevBlockHash,currBlockData);
  const blockHash = bitcoin.hashBlock(prevBlockHash,currBlockData,nonce);
  const newblock = bitcoin.createNewBlock(nonce,prevBlockHash,blockHash);

  bitcoin.createNewTransaction(12.5,"00",nodeAddress);
  res.json({
    note:"New Block Mined Successfuly",
    block: newblock
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
    return res.json({note: 'New node registered with network successfully'});
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
