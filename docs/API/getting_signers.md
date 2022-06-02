---
sidebar_label: "3. Getting the signer objects"
sidebar_position: 4
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---

# 3. Getting the signer objects

### 3.1 Example of getting the signer object (for manual EVM testing in the BE)

Avoid using 3.1 setup in production. Use it for initial or backend testing only.
<br/>

Add your private key to the environment:
```bash
touch .env
echo "SK=<Replace this with your Private Key>" >> .env
```

```javascript
// EVM chains compatible wallet:
import { Wallet } from "ethers";
import { config } from 'dotenv';
config();
// EVM signer for testing in the BE
const signer = new Wallet(
        process.env.SK!,
        // Replace 'polygonParams'
        // with the relevant parameter
        // from the table below
        CONFIG.polygonParams?.provider
    );
```
<center>

|Chain|Parameters|Chain Nonce|
| :-: | :-: |:-:|
|  Elrond   |  elrondParams   |2|
|    BSC    |    bscParams    |4|
| Ethereum  |  ropstenParams  |5|
| Avalanche | avalancheParams |6|
|  Polygon  |  polygonParams  |7|
|  Fantom   |  fantomParams   |8|
|   Tron    |   tronParams    |9|
|  Harmony  |  harmonyParams  |12|
|   xDai    |   xDaiParams    |14|
|Algorand|algorandParams|15|
|Fuse|fuseParams|16|
|Tezos|tezosParams|18|
|Velas|velasParams|19|
|Aurora|auroraParams|21|
|Godwoken|godwokenParams|22|
|Gatechain|gatechainParams|23|
|VeChain|vechainParams|25|

</center><br/>

### 3.2 Example of getting the signer object (in the FE for web3):<br/><br/>

```typescript
// EVM chains compatible signer:
import ethers from "ethers";
const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
```

<br/>

### 3.3 Example of getting the signer object (in the FE for Elrond):<br/><br/>

```typescript
// ELROND provider:
import { ExtensionProvider } from "@elrondnetwork/erdjs/out";
const elrondSigner = ExtensionProvider.getInstance();
```

<br/>

### 3.4 Example of getting the signer object (in the FE for Tron):<br/><br/>

```typescript
// Address is fetched from tronweb
(async () => {
  const addresses = await window.tronLink.tronWeb.request({
    method: "tron_requestAccounts",
  });
  const tronSigner = addresses[0];
})();
```

### 3.5 Example of getting the signer object (in the FE for Algorand):<br/><br/>

```typescript
import { typedAlgoSigner } from "xp.network/dist/helpers/algorand";
// Use the typedAlgoSigner function to get access to the Algorand signer
const algorandSigner = typedAlgoSigner();
```

### 3.6 Example of getting the signer object (in the FE for Tezos):<br/><br/>

```typescript
import { TempleWallet } from "@temple-wallet/dapp";
(async () => {
  try {
        const available = await TempleWallet.isAvailable();
        if (!available) {
            throw new Error("Temple Wallet is not installed");
        }
        const tezosSigner = new TempleWallet("bridge.xp.network");
    } catch (error) {
        console.error("Error:", error);
    }
})();
```
For the ways of connecting the wallets in the FE check-out our [bridge repository](https://github.com/xp-network/bridge-interface/blob/components-reorder/src/components/ConnectWallet.jsx)