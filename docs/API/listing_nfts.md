---
sidebar_label: "5. Listing NFTs"
sidebar_position: 6
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---

# 5. Listing NFTs

This operation does not depend on a wallet since reading operations are free and, therefore, do not require signing.
<br/>

## 5.1 Getting NFT Lists

```javascript
(async () => {

  // EVM:
  const web3Nfts = await factory.nftList(
    polygon,     // The chain of interest
    "0x...."     // The public key of the NFT owner in a web3 chain
  );

  // Elrond:
  const elrondNfts = await factory.nftList(
    elrond,     // The chain of interest
    "erd1...."  // The public key of the NFT owner in Elrond
  );

  // Tron:
  const tronNfts = await factory.nftList(
    tron,      // The chain of interest
    "TJuG..."  // The public key of the NFT owner in Tron
  );

  // Algorand:
  const algoNfts = factory.nftList(
    algorand,   // Algorand chain internal object
    "PUPTH..."  // The public key of the NFT owner in Algorand
  );

  // Tezos:
  const tezosNfts = await factory.nftList(
    tezos,    // Tezos chain internal object
    "tz1..."  // The public key of the NFT owner in Tezos
  );

})();
```
## Selecting an NFT from the list
Since the result of calling the `nftList` function is a list, selection can be done by the index of the NFT of interest like so:
```javascript
// Choosing an NFT to transfer:
const web3ChosenOne     = web3Nfts[0];
const elrondChosenOne   = elrondNfts[0];
const tronChosenOne     = tronNfts[0];
const algoChosenOne     = algoNfts[0];
const tezosChosenOne    = tezosNfts[0];

// Checking the selected NFT object
console.log("EVM Selected NFT:       ", web3ChosenOne);
console.log("Elrond Selected NFT:    ", elrondChosenOne);
console.log("Tron Selected NFT:      ", tronChosenOne);
console.log("Algorand Selected NFT:  ", algoChosenOne);
console.log("Tezos Selected NFT:     ", tezosChosenOne);
```

## 5.2 Example of console logged native BSC NFT object:
```json
{
    "boosterId": 10000000788939,
    "id": "10002366816",
    "txHash": "0x37c9b7c54ac05d5e00dd5cff06722fb67bed91ec91732875071f74bce8752e41",
    "randomNumber": "0x1459a03e3d7a5510023e7385d438508d725dd19de2237c6c1d79a9883b6dc0b3",
    "image": "https://assets.polkamon.com/images/Unimons_T02C03H06B04G00.jpg",
    "external_url": "https://polkamon.com/polkamon/T02C03H06B04G00",
    "description": "The Unifairy are the most magical and fairest of Polkamon. Their wings stretch into the realms beyond this world, enchanting those around her by her unique disposition.",
    "name": "Unifairy",
    "initialProbabilities": {
        "horn": 0.2,
        "color": 0.25,
        "background": 1,
        "glitter": 0.99,
        "type": 0.135
    },
    "attributes": [
        {
            "trait_type": "Type",
            "value": "Unifairy"
        },
        {
            "trait_type": "Horn",
            "value": "Spiral Horn"
        },
        {
            "trait_type": "Color",
            "value": "Blue"
        },
        {
            "trait_type": "Background",
            "value": "Mountain Range"
        },
        {
            "trait_type": "Opening Network",
            "value": "Binance Smart Chain"
        },
        {
            "trait_type": "Glitter",
            "value": "No"
        },
        {
            "trait_type": "Special",
            "value": "No"
        },
        {
            "display_type": "date",
            "trait_type": "Birthday",
            "value": 1633650473
        },
        {
            "display_type": "number",
            "trait_type": "Booster",
            "value": 10000000788939
        }
    ],
    "opening_network": "Binance Smart Chain",
    "background_color": "FFFFFF",
    "animation_url": "https://assets.polkamon.com/videos/Unimons_T02C03H06B04G00.mp4",
    "code": "T02C03H06B04G00",
    "uri": "https://meta.polkamon.com/meta?id=10002366816",
    "native": {
        "chainId": "4",
        "tokenId": "10002366816",
        "owner": "0x0d7df42014064a163DfDA404253fa9f6883b9187",
        "contract": "0x85f0e02cb992aa1f9f47112f815f519ef1a59e2d",
        "symbol": "PMONC",
        "name": "PolkamonOfficialCollection",
        "uri": "https://meta.polkamon.com/meta?id=10002366816",
        "contractType": "ERC721"
    }
}
```

## 5.3 Example of the console logged wrapped NFT from xDai

```json
{
    "name": "DRVR NOT LVR",
    "description": "Cliff Blank | Community Pool Drop\n\nWe would need a license to love, there would be fewer lines, fewer misunderstandings but definitely more accidents. \nThe arteries of our heart would be 4 lanes so that we could reach love in a short time. Of course, there could always be works and exits closed but at least we would have fewer surprises and we would react accordingly, choosing another exit or deciding to continue on our way.",
    "decimals": 0,
    "isBooleanAmount": true,
    "image": "https://ipfs.infura.io/ipfs/QmX4n4QJBsGmVuszy1fXMJHpGnpkp9BePVJNQ8Lf18yA8z",
    "artifactUri": "https://ipfs.infura.io/ipfs/QmX4n4QJBsGmVuszy1fXMJHpGnpkp9BePVJNQ8Lf18yA8z",
    "wrapped": {
        "contract": "0x1BFb3FbCf1ce331B7AAE03a3c0Bf3AcF685F4bD6",
        "tokenId": "10",
        "contractType": 721,
        "origin": "14",
        "original_uri": "https://ipfs.infura.io/ipfs/QmdtemgadGPgWSn9Lq1RvQn4Q2ofEpRNr7ox8oMyNWJ9ma",
        "mint_with": "0x3a1d5a87c5f0c2f5c5e079b0f234d8797ee0e9b4",
        "source_mint_ident": "0x1BFb3FbCf1ce331B7AAE03a3c0Bf3AcF685F4bD6"
    },
    "attributes": [
        {
            "trait_type": "Original Chain",
            "value": "xDai"
        },
        {
            "trait_type": "Original Chain Nonce",
            "value": "14"
        },
        {
            "trait_type": "Original URI",
            "value": "https://ipfs.infura.io/ipfs/QmdtemgadGPgWSn9Lq1RvQn4Q2ofEpRNr7ox8oMyNWJ9ma"
        }
    ],
    "displayUri": "https://ipfs.infura.io/ipfs/QmX4n4QJBsGmVuszy1fXMJHpGnpkp9BePVJNQ8Lf18yA8z",
    "thumbnailUri": "https://ipfs.infura.io/ipfs/QmX4n4QJBsGmVuszy1fXMJHpGnpkp9BePVJNQ8Lf18yA8z",
    "ipfs": false
}
```
