---
sidebar_label: "3. Getting the signer objects"
sidebar_position: 4
---

# 3. Getting the signer objects

## 3.1 Example of getting the signer object (for manual EVM testing in the BE)

| Chain | Parameters |
|:-----:|:-----:|
| Elrond | elrondParams |
| BSC | bscParams |
| Ethereum | ropstenParams |
| Avalanche | avalancheParams |
| Polygon | polygonParams |
| Fantom | fantomParams |
| Tron | tronParams |
| xDai | xDaiParams |

Avoid using the 3.1 setup in production. Use it for initial or backend testing only.

```javascript
// EVM chains compatible wallet:
import { Wallet } from "ethers";
// EVM signer for testing in the BE
const signer = new Wallet(
  "PRIVATE KEY HERE",
  mainnetConfig.polygonParams?.provider
);
```

## 3.2 Example of getting the signer object (in the FE for web3):<br/><br/>

```typescript
// EVM chains compatible signer:
import ethers from 'ethers';
const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner();
```
<br/>

## 3.3 Example of getting the signer object (in the FE for Elrond):<br/><br/>
```typescript
// ELROND provider:
import { ExtensionProvider } from "@elrondnetwork/erdjs/out";
const elrondSigner = ExtensionProvider.getInstance();
```

## 3.4 Example of getting the signer object (in the FE for Tron):<br/><br/>
```typescript
// Address is fetched from tronweb
(async () => {
  const addresses = await window.tronLink.tronWeb.request({
    method: "tron_requestAccounts",
  });
  const tronSigner = addresses[0];
})();
```

## 3.5 Example of getting the signer object (in the FE for Algorand):<br/><br/>
```typescript
// Use the typedAlgoSigner function to get access to the Algorand signer
const algorandSigner = typedAlgoSigner();
```

## 3.6 Example of getting the signer object (in the FE for Tezos):<br/><br/>
```typescript
import { TempleWallet } from "@temple-wallet/dapp";
(async () => {
  try {
    const available = await TempleWallet.isAvailable();
    if (!available) {
      throw new Error("Temple Wallet not installed");
    }
    const tezosSigner = new TempleWallet("bridge.xp.network");
})();
```

For the ways of connecting the wallets in the FE check-out our [bridge repository](https://github.com/xp-network/bridge-interface/blob/components-reorder/src/components/ConnectWallet.jsx)