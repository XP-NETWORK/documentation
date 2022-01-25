---
sidebar_label: "Transaction Fee Estimation"
sidebar_position: 10
---

# Transaction Fee Estimation (on the target chain)

Usually, users prefer to know in advance how much a transaction might cost before submitting it.

This function not only estimates the fee on the target chain but also converts it to the native currency of the chain of departure.
<br/>

```typescript
 (async () => {
      const feeEstimation = await factory.estimateFees(
            algorand,       // The Source Chain.
            tezos,          // The Destination Chain.
            algoChosenOne,  // The NFT object you have chosen from the list.
            "tz1..."        // The public key of the NFT owner in Tezos
      );
      console.log(`The estimated fee on Tezos is: ${feeEstimation} Algos`);
  })();
 ```