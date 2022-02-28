---
sidebar_label: 'Using JavaScript Library'
sidebar_position: 2
---

# Using JavaScript Library in the Testnet

## 1. Initiating a Node.js project
Initiate a JS/TS project

```bash
mkdir your_project
cd your_project/
yarn init -y
```

## 2. Installing the libraries

To test/use the latest commits of the library install directly from github

```bash
yarn add "git+https://github.com/xp-network/xpjs#bleeding-edge" @elrondnetwork/erdjs ethers @taquito/taquito @temple-wallet/dapp dotenv
```

## 3. Importing the Dependencies

```ts
import {
    ChainFactoryConfigs,  ChainFactory,
    ElrondHelper,         ElrondParams,
    TronHelper,           TronParams,
    Web3Helper,           Web3Params,
    AppConfigs
  } from "xp.network/dist/";
  import {config} from 'dotenv';
  config();

  // Chanin name to chain nonce mapper:
  import { Chain} from "xp.network/dist/consts";
  
  // Instantiate the chain factory for the TESTNET
  const testnetConfig = ChainFactoryConfigs.TestNet();
  const factory = ChainFactory(AppConfigs.TestNet(), testnetConfig);
```

## 4. Creating a signer object

Add a `.env` file and populate it with the Private Key of the signer

```bash
touch .env
echo "SK=<replace with your Provate Key>" >> .env
```
Add the signer object:
```ts
// EVM chains compatible wallet:
import { Wallet } from "ethers";
// EVM signer for testing in the BE
const signer = new Wallet(
  //  Private Key Of the Signer
  process.env.SK!,
  //   Replace <polygon>Params with the <chain>Params of your choice
  testnetConfig.polygonParams?.provider
);
// Print out your signer object to see that it matches the expected wallet
console.log("signer", signer);
```

## 5. Creating inner Blockchain objects

```ts
(async () => {
  // EVM-compatible chains:
  // Inner Object ============= Chain Nonce == Chain Nonce ==
  const bsc       = await factory.inner<4>(Chain.BSC);
  const ethereum  = await factory.inner<5>(Chain.ETHEREUM);
  const avax      = await factory.inner<6>(Chain.AVALANCHE);
  const polygon   = await factory.inner<7>(Chain.POLYGON);
  const fantom    = await factory.inner<8>(Chain.FANTOM);
  const velas     = await factory.inner<19>(Chain.VELAS);
  const gnosis    = await factory.inner<14>(Chain.XDAI);
  const harmony   = await factory.inner<12>(Chain.HARMONY);
  // To view an inner object:
  console.log("bsc:", bsc);
})();
```

## 6. Getting a list of NFTs a user owns on a Blockchain

```ts
(async () => {
  // Getting a list of NFTs
  const bscNFTs = await factory.nftList(
    bsc,            // The inner chain object
    signer.address  // The public key of the user
  );
  // To view a list of NFTs:
  console.log("NFTs:", bscNFTs);
})();
```

## 7. Transferring an NFT
```ts
(async () => {
    // Calling the function:
    const result = await factory.transferNft(
    bsc,                        // The Source Chain.
    polygon,                    // The Destination Chain.
    bscNFTs[0],                 // The NFT selected by the index.
    signer,                     // The web3 signer object.
    "ADDRESS OF THE RECEIVER"   // The address who you are transferring the NFT to.
  );
  console.log(web3Result);
})();
```