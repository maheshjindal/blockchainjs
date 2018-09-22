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
  //bitcoin.createNewBlock(23444,'2fdjihwih34442432238','fgajh3247327');
  console.log(bitcoin.chain);
  //console.log(bitcoin.chain[3]);

}
const testHash=()=>{
  const nb = new Blockchain();
  const previousBlockHash = "34g2n4h42kh42k4g4g2gj4g3"
  const nonce = 50
  const currentBlockData = [
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
      const gethas = nb.hashBlock(previousBlockHash,currentBlockData,nonce);
      console.log(gethas);

}
const testproof = ()=>{
  const nc = new Blockchain();
  console.log('=============TESTING PROOF OF WORK============');
  const previousBlockHash = "52257327kuyetuwrbwjRTYEWEgdhsey52";
  const currentBlockData = [
    {
      amount: 200,
      sender: '486274628746th2hgjh4ghj24g',
      recipient: '2h4jhg2jh423946827'
     },
     {
       amount: 400,
       sender: 'h3j4247342827892387293729jnfjr',
       recipient: '92487346248724gjhg4jhg2jh4g2'

     },
     {
       amount: 800,
       sender: '4872846472863424234',
       recipient: 'hurghjwr23647862846287376478'
    }
  ];
    let c = nc.proofOfWork(previousBlockHash,currentBlockData);
    console.log(`Nonce is ${c}`);
}
const testGenesis=()=>{
  const newBl = Blockchain();
  console.log(newBl);
}

createTransactions();
