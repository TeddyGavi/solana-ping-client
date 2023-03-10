import * as web3 from "@solana/web3.js";
import Dotenv from "dotenv";
Dotenv.config();

// async function main() {
//   const newKeypair = web3.Keypair.generate();
//   console.log(newKeypair.secretKey.toString());
// }

// main()
//   .then(() => {
//     console.log("Finished successfully");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

function initializeKeypair(): web3.Keypair {
  const secret = JSON.parse(process.env.PRIVATE_KEY ?? "") as number[];
  const secretKey = Uint8Array.from(secret);
  const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey);
  return keypairFromSecretKey;
}

async function main() {
  const payer = initializeKeypair();
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
}

async function pingProgram(connection: web3.Connection, payer: web3.Keypair) {}
