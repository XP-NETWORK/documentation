---
sidebar_label: "4. Getting the inner objects of the chains"
sidebar_position: 5
---

# 4. Getting the inner objects of the chains

The objects below can be used for connecting the chain of interests.<br/>
The objects are used as parameters in the functions:
1. nftList
2. approveForMinter
3. transferNft
4. mint
5. estimateFees
etc.

```javascript
(async () => {
  // EVM-compatible chains:
  // Inner Object ==================== Chain Helper === Chain Params === Chain Nonce ==
  const ethereum  = await factory.inner<Web3Helper,     Web3Params>    (Chain.ETHEREUM);
  const bsc       = await factory.inner<Web3Helper,     Web3Params>    (Chain.BSC);
  const polygon   = await factory.inner<Web3Helper,     Web3Params>    (Chain.POLYGON);
  const avax      = await factory.inner<Web3Helper,     Web3Params>    (Chain.AVALANCHE);
  const fantom    = await factory.inner<Web3Helper,     Web3Params>    (Chain.FANTOM);
  const velas     = await factory.inner<Web3Helper,     Web3Params>    (Chain.VELAS);
  const gnosis    = await factory.inner<Web3Helper,     Web3Params>    (Chain.XDAI);

  // Non-EVM chains:
  // Inner Object ==================== Chain Helper === Chain Params === Chain Nonce ==
  const algorand  = await factory.inner<AlgorandHelper, AlgorandParams>(Chain.ALGORAND);
  const elrond    = await factory.inner<ElrondHelper,   ElrondParams>  (Chain.ELROND);
  const tezos     = await factory.inner<TezosHelper,    TezosParams>   (Chain.TEZOS);
  const tron      = await factory.inner<TronHelper,     TronParams>    (Chain.TRON);
})();
```