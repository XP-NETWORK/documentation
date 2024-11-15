---
sidebar_label: "2. Importing the dependencies"
sidebar_position: 3
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---

# 2. Importing the dependencies

Import the dependencies like so:<br/>

```javascript
import {
    ChainFactoryConfigs,
    ChainFactory,
    Chain,
    AppConfigs,
    ChainParams
} from "xp.network";
```
Connecting to the mainnets of all the integrated chains:
```javascript
// MAINNET Factory object creation
const mainnetConfig = await ChainFactoryConfigs.MainNet()
const mainnetFactory: ChainFactory = ChainFactory(
    AppConfigs.MainNet(),
    mainnetConfig
);
```

Connecting to the testnets of all the integrated chains:
```javascript
// TESTNET Factory object creation
const testnetConfig = await ChainFactoryConfigs.TestNet();
const testnetFactory: ChainFactory = ChainFactory(
    AppConfigs.TestNet(),
    testnetConfig
);

// Switching between the mainnets & the testnets:
const factory: ChainFactory = mainnetFactory;
const CONFIG: Partial<ChainParams> = mainnetConfig;
```
