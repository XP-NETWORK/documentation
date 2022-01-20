---
sidebar_label: '6. FAQ'
sidebar_position: 7
---

# FAQ

> ## What NFT standards does the bridge support?

<br/>

At the moment of writing the bridge supports:
<br/>

1. ERC-721/BEP-721/TRC-721 in the EVM compatible blockchains
2. ESDT for Elrond
3. ASA-003 for Algorand
4. FA2 for Tezos

<br/>
ERC-1155 smart contract support is developed and audited.
We're currently working on implementing it in all the other components of the bridge. So, stay tuned.
<br/>

> ## Are the royalties preserved on the target chain?

<br/>
On the chain of origin the NFT is locked in the bridge SC and is a part of the smart contract where it was minted, so any attached logic applies to it.

On the target chain to support any logic, including royalties the wrapped NFT should be minted with the smart contract that has the required logic.

This will be possible with latest smart contracts we have recently developed. It will be the first bridge that allows transferring logic togeather with the NFTS.
<br/>

> ## Why is smart contract whitelisting required

<br/>

Many blockchain industry related cyber attacks involve maliciously crafted smart contracts. To reduce the impact area of the bridge infrastructure to interaction with trusted smart contracts whitelisting is essential.
<br/>

> ## How to whitelist a smart contract for the bridge to accept it?

<br/>

In order for a smart contract to be whitelisted there are several steps:
<br/>

1. The smart contract must be verified on the chain and its source code readable
2. An e-mail with a request should be sent to dima@xp.network and kint@xp.network:
    
    The message should contain the following information:
      1. Blockchain name(Ethereum, BSC, Avalanche, Polygon, etc.)
      2. Smart contract address
      3. Approximate number of NFTs planned for sending

3. XP.network team members will look through the source code of the NFT smart contract
4. The smart contract will be whitelisted or the initiator will be notified that the smart contract has the code that can harm the bridge therefore, it cannot be whitelisted.