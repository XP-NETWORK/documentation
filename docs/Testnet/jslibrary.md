---
sidebar_label: 'Using JavaScript Library'
sidebar_position: 2
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
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
  ChainFactoryConfigs,
  ChainFactory,
  Chain,
  AppConfigs,
  ChainParams,

import { config } from 'dotenv';
config();} from "xp.network";

(async () => {
  // Instantiate the chain factory for the
  // Connecting to the mainnnets of all the blockchains:
  const mainnetConfig = await ChainFactoryConfigs.MainNet();
  const mainnetFactory: ChainFactory = ChainFactory(
    AppConfigs.MainNet(),
    mainnetConfig
  );

  // Connecting to the testnets of all the blockchains:
  const testnetConfig = await ChainFactoryConfigs.TestNet();
  const testnetFactory: ChainFactory = ChainFactory(
    AppConfigs.TestNet(),
    testnetConfig
  );

  // Switching between the mainnets & the testnets:
  const factory: ChainFactory = mainnetFactory;       // or = testnetConfig;
  const CONFIG: Partial<ChainParams> = mainnetConfig; // or = testnetConfig;
})();
```

## 4.1 Creating a signer object for EVM compatible chains

Add a `.env` file and populate it with the Private Key of the signer:

```bash
touch .env
echo "SK=<replace with your Private Key>" >> .env
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

## 4.2 Creating a signer object for Elrond

```bash
echo "ELROND_PEM=<replace with your Elrond PEM key, replace line breaks with \n>" >> .env
```
Typescript code snippets

```ts
// ELROND provider (injected from the browser extension):
import { ExtensionProvider } from "@elrondnetwork/erdjs/out";
const elrondSigner = ExtensionProvider.getInstance();

// Elrond signer from a PEM key stored in the .env file
import { UserSigner } from "@elrondnetwork/erdjs/out";
const elrondSigner = UserSigner.fromPem(process.env.ELROND_PEM!);
```

## 4.3 Example signer object for TON

```bash
echo "TON_MNEMONIC=<replcae with space separated mnemonic>" >> .env
```

```ts
import { config } from "dotenv";
config();
import {
  AppConfigs,
  Chain,
  ChainFactory,
  ChainFactoryConfigs,
} from "xp.network";

import { mnemonicToKeyPair } from "tonweb-mnemonic";

(async () => {
  const factory = ChainFactory(
    AppConfigs.TestNet(),
    await ChainFactoryConfigs.TestNet()
  );

  const ton = await factory.inner(Chain.TON);

  const tonSigner = ton.tonKpWrapper(
    // where TON_MNEMONIC="space separated mnemonic phrase ..."
    await mnemonicToKeyPair(process.env.TON_MNEMONIC!.split())
  );
})();
```


## 5. Creating inner Blockchain objects

```ts
(async () => {
  // Inner Object ====================================== Chain Nonce
  const bsc = await factory.inner(Chain.BSC);               // 4
  const ethereum = await factory.inner(Chain.ETHEREUM);     // 5
  const avax = await factory.inner(Chain.AVALANCHE);        // 6
  const polygon = await factory.inner(Chain.POLYGON);       // 7
  const fantom = await factory.inner(Chain.FANTOM);         // 8
  const harmony = await factory.inner(Chain.HARMONY);       // 12
  const gnosis = await factory.inner(Chain.XDAI);           // 14
  const fuse = await factory.inner(Chain.FUSE);             // 16
  const velas = await factory.inner(Chain.VELAS);           // 19
  const aurora = await factory.inner(Chain.AURORA);         // 21
  const godwoken = await factory.inner(Chain.GODWOKEN);     // 22
  const gatechain = await factory.inner(Chain.GATECHAIN);   // 23
  const vechain = await factory.inner(Chain.VECHAIN);       // 25
  const hedera = await factory.inner(Chain.HEDERA);         // 29
  const skale = await factory.inner(Chain.SKALE);           // 30
  const moonbeam = await factory.inner(Chain.MOONBEAM);     // 32
  const abeychain = await factory.inner(Chain.ABEYCHAIN);   // 33

  // Non-EVM chains:
  // Inner Object ====================================== Chain Nonce
  const elrond = await factory.inner(Chain.ELROND);         // 2
  const tron = await factory.inner(Chain.TRON);             // 9
  const algorand = await factory.inner(Chain.ALGORAND);     // 15
  const tezos = await factory.inner(Chain.TEZOS);           // 18
  const solana = await factory.inner(Chain.SOLANA);         // 26
  const ton = await factory.inner(Chain.TON);               // 27
  const dfinity = await factory.inner(Chain.DFINITY);       // 28
  const near = await factory.inner(Chain.NEAR);             // 31
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

  // TON example:
  const tonNfts = await factory.nftList(
    ton, // TON chain internal object
    "tz1..." // The public key of the NFT owner in TON
  );
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
  console.log(result);
})();
```

## 7. Arbitrary stages: Minting

### 7.1 Minting on EVM chains

```ts
/**
* A function for minting multiple NFTs
* @param departureChain - the chain of departure
* @param uris - an array of metadata links
* @param contract - the address of the NFT smart contract to mint NFTs with (ex. UserNftMinter)
* @param factory - a commonized interface for interacting with different protocols
*/
const mint = async (departureChain: Web3Helper, uris: String[], contract: string, factory: ChainFactory) => {

    const signer = new Wallet(process.env.SK!, departureChain.getProvider());

    for await (const uri of uris) {

        const nftResult = await factory.mint(
            departureChain,
            signer,
            {
                contract,
                uris: [uri]
            } as NftMintArgs
        );
        console.log(`Done ${uri}`, nftResult);
    }
}

// Calling the minting function (Example)
(async () => {

  console.log("Minting NFTs for Polygon...");
  const URIs = [
            "Link1",
            "Link2",
            "LinkN"
        ];
  await mint(
    polygon,        // the chain of departure
    URIs,           // an array of metadata links
    "<NFT smart contract address here>", 
    factory         // a commonized interface created earlier
  );

  process.exit(0);
})().catch(error => {
    console.error(error)
    process.exit(1);
});

```

### 7.2 Minting on Elrond

```ts
(async () => {
  // Deploying ESDTs:
  const response = await elrond.issueESDTNft(
      elrondSigner,
      "Collection Name",
      "Token Ticker",
      true, // canFreeze
      true, // canWipe
      true  // canTransferNftCreateRole
  );

  // Checking whether ESDTs exist for this account
  const esdts = await elrond.mintableEsdts(
    elrondSigner.getAddress())
    .catch((e) => {
      console.log("Failed to get Mintable ESDTs", e)
      return undefined
  })

    const identifier = esdts ? esdts[0]: undefined;

    if (!identifier) {
        throw new Error("No ESDT found for this address");
    }

    // Minting an NFT to an ESDT
    const response = await elrond.mintNft(
      elrondSigner,
      {
        identifier,  // Your ESDT token
        quantity: 1, // How many tokens you want to mint > 0
        name: "Your token name goes here",
        uris: ["replace with your link(s)"],
     } as any);

    console.log(response);
})();
```