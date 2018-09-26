const Blockchain = require('./blockchain.js')
const bitcoin = new Blockchain();

// const addBlock = ()=>{
//   bitcoin.createNewBlock(23444,'2fdjihwih34442432238','fgajh3247327');
//   bitcoin.createNewBlock(23444,'2fdjihwih34442432238','fgajh3247327');
//   bitcoin.createNewBlock(23444,'2fdjihwih34442432238','fgajh3247327');
//   console.log(bitcoin);
// }
//
// const createTransactions = ()=>{
//   bitcoin.createNewTransaction(2000,'rwgrwnsbf348734fjs','234ijj23jhjnw');
//   //bitcoin.createNewBlock(23444,'2fdjihwih34442432238','fgajh3247327');
//   console.log(bitcoin.chain);
//   //console.log(bitcoin.chain[3]);
//
// }
// const testHash=()=>{
//   const nb = new Blockchain();
//   const previousBlockHash = "34g2n4h42kh42k4g4g2gj4g3"
//   const nonce = 50
//   const currentBlockData = [
//     {
//       amount: 2000,
//       sender: 'rwgrwnsbf348734fjs',
//       recipient: '234ijj23jhjnw'
//      },
//      {
//        amount: 2000,
//        sender: 'rwgrwnsbf348734fjs',
//        recipient: '234ijj23jhjnw'
//
//      },
//      {
//        amount: 2000,
//        sender: 'rwgrwnsbf348734fjs',
//        recipient: '234ijj23jhjnw'
//     }
// ]
//       const gethas = nb.hashBlock(previousBlockHash,currentBlockData,nonce);
//       console.log(gethas);
//
// }
// const testproof = ()=>{
//   const nc = new Blockchain();
//   console.log('=============TESTING PROOF OF WORK============');
//   const previousBlockHash = "52257327kuyetuwrbwjRTYEWEgdhsey52";
//   const currentBlockData = [
//     {
//       amount: 200,
//       sender: '486274628746th2hgjh4ghj24g',
//       recipient: '2h4jhg2jh423946827'
//      },
//      {
//        amount: 400,
//        sender: 'h3j4247342827892387293729jnfjr',
//        recipient: '92487346248724gjhg4jhg2jh4g2'
//
//      },
//      {
//        amount: 800,
//        sender: '4872846472863424234',
//        recipient: 'hurghjwr23647862846287376478'
//     }
//   ];
//     let c = nc.proofOfWork(previousBlockHash,currentBlockData);
//     console.log(`Nonce is ${c}`);
// }
// const testGenesis=()=>{
//   const newBl = Blockchain();
//   console.log(newBl);
// }
//
// createTransactions();



var bc = {
"chain": [
{
"index": 1,
"timestamp": 1537976882721,
"transactions": [],
"nonce": 100,
"hash": "0",
"previousBlockHash": "0"
},
{
"index": 2,
"timestamp": 1537976892820,
"transactions": [],
"nonce": 18140,
"hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
"previousBlockHash": "0"
},
{
"index": 3,
"timestamp": 1537976945761,
"transactions": [
{
"amount": 12.5,
"sender": "00",
"recipient": "8d2da910c1a311e88831e50ee542759b",
"transactionId": "93414b40c1a311e88831e50ee542759b"
}
],
"nonce": 57407,
"hash": "0000f7a4decab5eae1719303ddaffc7162e85107008f00217205b81f9e8a04d4",
"previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
},
{
"index": 4,
"timestamp": 1537976994997,
"transactions": [
{
"amount": 12.5,
"sender": "00",
"recipient": "8d2da910c1a311e88831e50ee542759b",
"transactionId": "b2c8e360c1a311e88831e50ee542759b"
}
],
"nonce": 13045,
"hash": "00004050770560a1101362d0f479b37a3284e98c8909abff4a4969ec6377f44c",
"previousBlockHash": "0000f7a4decab5eae1719303ddaffc7162e85107008f00217205b81f9e8a04d4"
}
],
"pendingTransactions": [
{
"amount": 12.5,
"sender": "00",
"recipient": "8d2da910c1a311e88831e50ee542759b",
"transactionId": "d01a61a0c1a311e88831e50ee542759b"
}
],
"networkNodes": [],
"currentNodeURL": "http://localhost:3001"
}

console.log(bitcoin.chainIsValid(bc.chain));
