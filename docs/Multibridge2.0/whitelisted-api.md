---
sidebar_label: '11. Whitelisted NFTs API'
sidebar_position: 11
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---

# Whitelisted NFTs API & Its Usage

This API allows to dynamically receive a list of the contracts whitelisted for a particular chain. The service is available at the following address:

https://xpnet-whitelisted-api.herokuapp.com

Later the address will be replaced with:

https://whitelisted.xp.network

## Getting the whitelisted contracts by the name of a chain

Replace `polygon` with the chain of interest

```bash
curl https://xpnet-whitelisted-api.herokuapp.com/polygon
```

## Getting the whitelisted contracts by a chain nonce

Replace `7` with the nonce of the chain of interest

```bash
curl https://xpnet-whitelisted-api.herokuapp.com/7
```

## Available chains:

|Blockchain|Chain Nonce|
|:-:|:-:|
|Reserved|1|
|ELROND|2|
|<s>HECO</s>*|3|
|BSC|4|
|ETHEREUM|5|
|AVALANCHE|6|
|POLYGON|7|
|FANTOM|8|
|TRON|9|
|<s>CELO</s>*|11|
|HARMONY|12|
|<s>ONTOLOGY</s>*|13|
|XDAI|14|
|ALGORAND|15|
|FUSE|16|
|UNIQUE|17|
|TEZOS|18|
|VELAS|19|
|IOTEX|20|
|AURORA|21|
|GateChain|23|
|Reserved|24|
|Godwoken|25

> NB! * chains marked by an asterisk are NOT available