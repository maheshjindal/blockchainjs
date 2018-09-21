const Blockchain = require('./blockchain.js')
const bitcoin = new Blockchain();

const addBlock = ()=>{
  bitcoin.createNewBlock(23444,'2fdjihwih34442432238','fgajh3247327');
  bitcoin.createNewBlock(23444,'2fdjihwih34442432238','fgajh3247327');
  bitcoin.createNewBlock(23444,'2fdjihwih34442432238','fgajh3247327');
  console.log(bitcoin);
}

const createTransactions = ()=>{
  bitcoin.createNewTransaction(2000,'rwgrwnsbf348734fjs','234ijj23jhjnw');
  bitcoin.createNewBlock(23444,'2fdjihwih34442432238','fgajh3247327');
  console.log(bitcoin.chain);
  console.log(bitcoin.chain[3]);

}
addBlock();
createTransactions();
