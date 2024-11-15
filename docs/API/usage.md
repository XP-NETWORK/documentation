---
sidebar_label: "Contents"
sidebar_position: 1
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---
# XP Network JS API

Work In Progress / Alpha Stage Library

The JS API  library is used by the Bridge UI in the background ensuring that every line of its code is working properly.

The library was designed to help dApps seamlessly integrate the bridge functionality and use it from the frontends of the existing marketplaces or NFT based games turning them into cross-chain scalable applications.

To transfer NFTs across networks developers have to take the following steps:
## Bridging steps

- [x] [1. Installing the library](./installation.md)
- [x] [2. Importing the dependencies](./importing.md)
- [x] [3. Getting the signer objects](./getting_signers.md)
  - [3.1 Backend unsafe signer](./getting_signers.md#31-example-of-getting-the-signer-object-for-manual-evm-testing-in-the-be)
  - [3.2 EVM compatible browser extension signer](./getting_signers.md#32-example-of-getting-the-signer-object-in-the-fe-for-web3)
  - [3.3 Elrond signer](./getting_signers.md#33-example-of-getting-the-signer-object-in-the-fe-for-elrond)
  - [3.4 Tron signer](./getting_signers.md#34-example-of-getting-the-signer-object-in-the-fe-for-tron)
  - [3.5 Algorand signer](./getting_signers.md#35-example-of-getting-the-signer-object-in-the-fe-for-algorand)
  - [3.6 Tezos signer](./getting_signers.md#36-example-of-getting-the-signer-object-in-the-fe-for-tezos)
- [x] [4. Getting the Chain inner objects](./inner_objects.md)
- [x] [5.1 Listing NFTs](./listing_nfts.md)
  - [5.2 Example of a native NFT object](./listing_nfts.md#52-example-of-console-logged-native-bsc-nft-object)
  - [5.3 Example of a wrapped NFT object](./listing_nfts.md#53-example-of-the-console-logged-wrapped-nft-from-bsc-on-velas)
- [x] [6. Approving](./approving.md)
- [x] [7. Transferring NFTs between chains](./transferring.md)
- [x] [Minting NFTs](./minting.md)(optional)
- [x] [Estimating the TX fee on the target chain](./fee_estimation.md) (optional)
- [ ] ... and there's much more to come
