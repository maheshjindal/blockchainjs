const Blockchain = require('./blockchain.js')
const bitcoin = new Blockchain();

const addBlock = ()=>{
  bitcoin.createNewBlock(23444,'2fdjihwih34442432238','fgajh3247327');
  bitcoin.createNewBlock(23444,'2fdjihwih34442432238','fgajh3247327');
  bitcoin.createNewBlock(23444,'2fdjihwih34442432238','fgajh3247327');
  console.log(bitcoin);
}

addBlock();
