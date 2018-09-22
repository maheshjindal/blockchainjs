const sha256 = require('sha256');

class Blockchain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
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

  createNewTransaction(amount, sender, recipient) {
    const newTransaction = {
      amount: amount,
      sender: sender,
      recipient: recipient
    };
    this.pendingTransactions.push(newTransaction);
    return this.getLastBlock["index"]+1;
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
  getLastBlock() {
    return this.chain[this.chain.length - 1]
  }
}

module.exports = Blockchain;
