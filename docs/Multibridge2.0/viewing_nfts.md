---
sidebar_label: '4. Viewing NFTs'
sidebar_position: 5
---

# Viewing NFTs

XP.network has developed a tool called "***NFT Indexer***". It allows viewing NFTs by two parameters:
1. The blockchain of interest
2. The Public Key of the NFT owner

**How it works**:
1. XP.network has looped through the blocks of the integrated blockchins since their genesis.
2. We read the transactions of the blocks.
3. If a transaction was NFT minting, transferring or burning related, we saved the new owner of the NFT in our database togeather with the information about that NFT.

**The main bridging screen allows to**:
1. Select one or multiple NFTs
2. View NFT metadata
3. Provide the bridge with the address of the receiver on the target chain
4. Approve in the original NFT smart contract that the new **operator** is the bridge SC
5. Transfer one or multiple NFTs to the chain of destination

**Example:**

In this example we're sending one NFT called "Unifairy" ID: 10002366816 from BSC to Velas to the same address. 

EVM chains use the same elliptical curve cryptography which allows reusing the same key pairs on multiple chains. In other words, we can have the same account accross all the EVM blockchains and use the same private key for signing our transactions.

![NFT Index](../../static/assets/3.png)