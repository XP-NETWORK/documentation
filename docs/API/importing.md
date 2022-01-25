---
sidebar_label: "2. Importing the dependencies"
sidebar_position: 3
---

# 2. Importing the dependencies

Import the dependencies like so:<br/>

```javascript
import {
  ChainFactoryConfigs,  ChainFactory,
  ElrondHelper,         ElrondParams,
  TronHelper,           TronParams,
  Web3Helper,           Web3Params,
  typedAlgoSigner
} from "xp.network/dist";

// Chan name to chain nonce mapper & the cofiguration constants:
import { Chain, Config } from "xp.network/dist/consts";
```
Connecting to the mainntets of all the integrated chains:
```javascript
// MAINNET Factory object creation
const mainnetConfig = ChainFactoryConfigs.MainNet();
const factory = ChainFactory(Config, mainnetConfig);
```

Connecting to the testnets of all the integrated chains:
```javascript
// TESTNET Factory object creation
const testnetConfig = ChainFactoryConfigs.TestNet();
const factory = ChainFactory(Config, testnetConfig);
```