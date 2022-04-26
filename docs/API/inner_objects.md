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
  (async () => {
  // Inner Object ================================ Chain Nonce
    const bsc       = await factory.inner(Chain.BSC);       // 4
    const ethereum  = await factory.inner(Chain.ETHEREUM);  // 5
    const avax      = await factory.inner(Chain.AVALANCHE); // 6
    const polygon   = await factory.inner(Chain.POLYGON);   // 7
    const fantom    = await factory.inner(Chain.FANTOM);    // 8
    const harmony   = await factory.inner(Chain.HARMONY);   // 12
    const gnosis    = await factory.inner(Chain.XDAI);      // 14
    const fuse      = await factory.inner(Chain.FUSE);      // 16
    const velas     = await factory.inner(Chain.VELAS);     // 19
    const aurora    = await factory.inner(Chain.AURORA);    // 21
    const godwoken  = await factory.inner(Chain.GODWOKEN);  // 22
    const gatechain = await factory.inner(Chain.GATECHAIN); // 23
    const vechain   = await factory.inner(Chain.VECHAIN);   // 25

    // Non-EVM chains:
    // Inner Object ================================ Chain Nonce
    const elrond    = await factory.inner(Chain.ELROND);    // 2
    const tron      = await factory.inner(Chain.TRON);      // 9
    const algorand  = await factory.inner(Chain.ALGORAND);  // 15
    const tezos     = await factory.inner(Chain.TEZOS);     // 18
})();
})();
```