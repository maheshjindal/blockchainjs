const sha256 = require('sha256');
const currentnodeURL = process.argv[3];
const uuid = require('uuid/v1');

class Blockchain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.networkNodes = [];
    this.currentNodeURL = currentnodeURL;
    this.createNewBlock(100,'0','0');
  }

  createNewBlock(nonce, previousBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendingTransactions,
        nonce: nonce,
        hash: hash,
        previousBlockHash: previousBlockHash,
      };
      this.pendingTransactions = [];
      this.chain.push(newBlock);
      return newBlock;
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1]
  }

  createNewTransaction(amount, sender, recipient) {
    const newTransaction = {
      amount: amount,
      sender: sender,
      recipient: recipient,
      transactionId : uuid().split('-').join(''),
    };
    return newTransaction;
  }

  addTransactionToPendingTransactions(transactionObj) {
    this.pendingTransactions.push(transactionObj);
    return (this.getLastBlock()["index"]+1);
  }
  hashBlock(previousBlockHash, currentBlockData, nonce) {
    const newDataString = previousBlockHash+nonce.toString()+JSON.stringify(currentBlockData);
    const hash = sha256(newDataString);
    return hash;
  }


  proofOfWork(previousBlockHash, currentBlockData) {
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash,currentBlockData, nonce);
    while(hash.substring(0,4) !== '0000'){
      nonce++;
      hash = this.hashBlock(previousBlockHash,currentBlockData, nonce)
      console.log(`Hash at nonce ${nonce} is ${hash}`);
    }
    return nonce;
  }

}

module.exports = Blockchain;
