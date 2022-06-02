---
sidebar_label: "7. Transferring NFTs"
sidebar_position: 8
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---

# 7. Transferring NFTs

```javascript
(async () => {
  // EVM compatible chains example:
  const web3Result = await factory.transferNft(
    polygon,                    // The Source Chain.
    bsc,                        // The Destination Chain.
    theChosenOne,               // The NFT object you have chosen from the list.
    signer,                     // The web3 signer object (see p. 3.2 above).
    "ADDRESS OF THE RECEIVER"   // The address whom you are transferring the NFT to.
  );
  console.log(web3Result);

  // Elrond example:
  const elrondResult = await factory.transferNft(
    elrond,                     // The Source Chain.
    tron,                       // The Destination Chain.
    elrondChosenOne,            // The NFT object you have chosen from the list.
    elrondSigner,               // The Elrond signer object (see p. 3.3 above).
    "ADDRESS OF THE RECEIVER"   // The address whom you are transferring the NFT to.
  );
  console.log(elrondResult);

  // Tron example:
  const tronResult = await factory.transferNft(
    tron,                       // The Source Chain.
    elrond,                     // The Destination Chain.
    tronChosenOne,              // The NFT object you have chosen from the list.
    tronSigner,                 // The Tron signer object (see p. 3.4 above).
    "ADDRESS OF THE RECEIVER"   // The address whom you are transferring the NFT to.
  );
  console.log(tronResult);

  // Algorand example:
  const algorandResult = await factory.transferNft(
    algorand,                   // The Source Chain.
    elrond,                     // The Destination Chain.
    algoChosenOne,              // The NFT object you have chosen from the list.
    algorandSigner,             // The Tron signer object (see p. 3.5 above).
    "ADDRESS OF THE RECEIVER"   // The address whom you are transferring the NFT to.
  );
  console.log(algorandResult);

  // Tezos example:
  const tezosResult = await factory.transferNft(
    tezos,                      // The Source Chain.
    velas,                      // The Destination Chain.
    algoChosenOne,              // Or the NFT object you have chosen from the list.
    algorandSigner,             // The Tron signer object (see p. 3.5 above).
    "ADDRESS OF THE RECEIVER"   // The address whom you are transferring the NFT to.
  );
  console.log(tezosResult);
})();
```