import * as web3 from "@solana/web3.js";
import Dotenv from "dotenv";
Dotenv.config();
const PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const PROGRAM_DATA_ADDRESS = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

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

async function pingProgram(connection: web3.Connection, payer: web3.Keypair) {
  const transaction = new web3.Transaction();

  const programId = new web3.PublicKey(PROGRAM_ADDRESS);
  const programDataPubkey = new web3.PublicKey(PROGRAM_DATA_ADDRESS);

  const instruction = new web3.TransactionInstruction({
    keys: [
      {
        pubkey: programDataPubkey,
        isSigner: false,
        isWritable: true,
      },
    ],
    programId,
  });
  transaction.add(instruction);

  const signature = await web3.sendAndConfirmTransaction(
    connection,

    transaction,

    [payer]
  );

  console.log(signature);
  console.log(
    `You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`
  );
}

async function main() {
  const payer = initializeKeypair();
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  await connection.requestAirdrop(payer.publicKey, web3.LAMPORTS_PER_SOL * 1);
  await pingProgram(connection, payer);
}

main();
