---
sidebar_label: "6. Approving the NFT operator"
sidebar_position: 7
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---

# 6. Approving the NFT operator

Approving is a part of ERC-721/ERC-1155 standards. It is a necessary step to appoint the bridge smart contract the "operator" of the chosen NFT.

```javascript
(async () => {
  // EVM example
  const isApprovedEVM = await polygon.approveForMinter(web3ChosenOne, signer);
  console.log("Is Approved in an EVM:", isApprovedEVM);

  // Elrond example
  const isApprovedElrond = await elrond.approveForMinter(elrondChosenOne, elrondSigner);
  console.log("Is Approved in Elrond:", isApprovedElrond);

  // Tron example
  const isApprovedTron = await elrond.approveForMinter(tronChosenOne, tronSigner);
  console.log("Is Approved in Tron:", isApprovedTron);

  // Algorand example
  const isApprovedAlgorand = await algorand.approveForMinter(algoChosenOne, algorandSigner);
  console.log("Is Approved in Algorand:", isApprovedAlgorand);

  // Tezos example
  const isApprovedTezos = await algorand.approveForMinter(tezosChosenOne, tezosSigner);
  console.log("Is Approved in Tezos:", isApprovedTezos);
})();
```