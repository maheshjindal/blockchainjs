class Blockchain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
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
  getLastBlock() {
    return this.chain[this.chain.length - 1]
  }
}

module.exports = Blockchain;
