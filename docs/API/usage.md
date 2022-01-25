---
sidebar_label: "Contents"
sidebar_position: 1
---
# XP Network JS API

Work In Progress / Alpha Stage Library

The JS API  library is used by the Bridge UI in the background ensuring that every line of its code is working properly.

The library was designed to help dApps seamlessly integrate the bridge functionality and use it from the frontends of the existing marketplaces or NFT based games turning them into cross-chain scalable applications.

To transfer NFTs accross networks developers have to take the following steps:
## Bridging steps

- [x] [1. Installing the library](./installation)
- [x] [2. Importing the dependencies](./importing)
- [x] [3. Getting the signer objects](./getting_signers)
  - [3.1 Backend unsafe signer](./getting_signers#31-example-of-getting-the-signer-object-for-manual-evm-testing-in-the-be)
  - [3.2 EVM compatible browser extension signer](./getting_signers#32-example-of-getting-the-signer-object-in-the-fe-for-web3)
  - [3.3 Elrond signer](./getting_signers#33-example-of-getting-the-signer-object-in-the-fe-for-elrond)
  - [3.4 Tron signer](./getting_signers#34-example-of-getting-the-signer-object-in-the-fe-for-tron)
  - [3.5 Algorand signer](./getting_signers#35-example-of-getting-the-signer-object-in-the-fe-for-algorand)
  - [3.6 Tezos signer](./getting_signers#36-example-of-getting-the-signer-object-in-the-fe-for-tezos)
- [x] [4. Getting the Chain inner objects](./inner_objects)
- [x] [5.1 Listing NFTs](./listing_nfts)
  - [5.2 Example of a native NFT object](./listing_nfts#52-example-of-console-logged-native-bsc-nft-object)
  - [5.3 Example of a wrapped NFT object](./listing_nfts#53-example-of-the-console-logged-wrapped-nft-from-bsc-on-velas)
- [x] [6. Approving](./approving)
- [x] [7. Transferring NFTs between chains](./transferring)
- [x] [Minting NFTs](./minting)(optional)
- [x] [Estimating the TX fee on the target chain](./fee_estimation) (optional)
- [ ] ... and there's much more to come
