const express = require('express');
const Blockchain = require('./blockchain.js');
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');
const nodeAddress = uuid().split('-').join('');
//the initial string contains dashes, So to remove that dashes we use it

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


app.get('/mine',(req,res)=>{
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

app.listen(3000,()=>{
  console.log("Currently on port 3000");
});
