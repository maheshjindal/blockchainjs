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
const testHash=()=>{
  const nb = new Blockchain();
  currentBlockData = "34g2n4h42kh42k4g4g2gj4g3"
  nonce = 50
  previousBlockData = [
    {
      amount: 2000,
      sender: 'rwgrwnsbf348734fjs',
      recipient: '234ijj23jhjnw' 
     },
     {
       amount: 2000,
       sender: 'rwgrwnsbf348734fjs',
       recipient: '234ijj23jhjnw'

     },
     {
       amount: 2000,
       sender: 'rwgrwnsbf348734fjs',
       recipient: '234ijj23jhjnw'
    }
]
      const gethas = nb.hashBlock(previousBlockData,currentBlockData,nonce);
      console.log(gethas);
}
addBlock();
createTransactions();
testHash();
