---
sidebar_label: '15. Collection Migration (Tezos)'
sidebar_position: 15
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---

# Collection Migration (Tezos)

To avoid tedious transfers of a 10,000-strong NFT collection one by one, we have prepared a convenient shortcut. This step-by-step instruction walks you through the process.

:::info
NB At the moment this Application only works for sending NFTs from TEZOS to EVM chains!
:::

## Step 1. Downloading the dedicated bridge UI

To download the UI from our repository to your local machine, open a terminal and run:

```
git clone https://github.com/XP-NETWORK/bridge-interface-bulkActions.git
```

## Step 2 Launching the App

To launch the UI, open the repository you cloned during the previous step and in the terminal run:

```
cd bridge-interface-bulkActions/
yarn
yarn start
```

## Step 3 Openning the App

The application will open at its default port 3000. If the port is busy it will ask the user to confirm another port.

```http
http://localhost:3000/
```

You will see the initial screen:

![1](/img/batchMapping/1.png)

Select the chains of departure & destination and log in with your wallet:

![2](/img/batchMapping/2.png)

Because this UI is meant for processing thousands of NFTs images loading in the NFT cards was disabled.

1. Provide the address on the destination chain
2. Select the NFTs you want to send by their names and/or IDs
3. Provide the private key of your wallet in the `Private Key` input box.
4. Press the `Send` button and wait.

![3](/img/batchMapping/3.png)

Your private key will be used for signing the approving & sending transactions in a loop till all the selected NFTs are sent.

Signing happens locally, so there's no danger of the private key compromise.

> P.S. No pop-up windows with the browser extension wallet will appear. All the signing will happen in the code.

> Check the transactions in the explorers of the blockchains.

> To quickly find the relevant transactions filter them by the address of the sender on the chain of departure and the address of the receiver on the chain of destination.

## Temporary step - Debugging

Because the App reliaes on external libraries and they have their dependencies that we cannot get rid of.

We've openned an issue an one of such libraries that does not let the App build and launch: https://github.com/LedgerHQ/ledger-live/issues/763

If at the moment of reading this document the issue is still not solved and closed do the following:

1. Open the following file in the dependencies:
```
node_modules/@ledgerhq/hw-transport-webhid/lib-es/TransportWebHID.js
```
2. Go to line # 69
3. Change the line like so:<br/>

This is how it was:
```
import hidFraming from "@ledgerhq/devices/hid-framing";
```
This is how it should be to compile and run:
```
import hidFraming from "@ledgerhq/devices/lib/hid-framing";
```

## Alternatively

Use the following link: https://batch-transfers.bridge.xp.network/
