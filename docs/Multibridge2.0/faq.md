---
sidebar_label: '7. FAQ'
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# FAQ

## Why do we need the NFT Multi-Chain Bridge?
<details>
  <summary>Answer</summary>
  <div>
  The industry is abundant in fungible token bridges that are more straightforward to build. There are too few NFT bridging solutions to mention, and those that exist connect only EVM chains, or at most one Non-EVM to one or a couple of EVM ones.

  The year 2021 has been marked by the explosion of interest in Non-Fungible tokens. Their sales grew from thousands of USD to hundreds of millions of USD per month. XP.network bridge fills the gap, connecting the insular ecosystems into a global network of interoperable markets.
  </div>
</details>

## Who are the users of the bridge?
<details>
  <summary>Answer</summary>
  <div>
The bridge has been built to satisfy the needs of different groups of users. Therefore, it consists of several components.

The Bridge **User Interface** is available at https://bridge.xp.network. It is designed for non-coding users such as NFT owners, traders, investors, collectors, and artistic content creators.

The bridge **JavaScript library** available at https://www.npmjs.com/package/xp.network can be utilized by:

1. **The cross-chain games** with teams of players spread across the blockchains whose raging armies of militant invaders or peaceful treasure hunters and gold miners can travel from one blockchain to another, either gaining value or getting annihilated by superior forces of the aborigen inhabitants. 

2. **Cross-chain marketplaces** save hundreds of thousands of dollars and developer-hours by using the ever-growing library allowing the users to buy Solana NFTs from Elrond and pay for the assets and the transaction fees with a currency of the customer's choice.

3. **NFT Projects** preferring global over local presence expose the freshly minted collections with groundbreaking logic or breathtaking design to tens or, eventually, hundreds of communities at once enjoying previously unprecedented demand and sales volumes.

The bridge **REST API** service supports developers in Python, Java, C#, C++, or any other programming languages to use the functionality of the bridge by calling POST requests with the function call parameters stored in the body of the requests. In return, the service returns valid for the chain of interest but unsigned transactions the users can sign and submit from the application of the third parties.
  </div>
</details>

## How many chains does the NFT Multi-Bridge connect?
<details>
  <summary>Answer</summary>
  <div>
The bridge already connects 12 EVM:

1. Ethereum
2. Binance smart Chain
3. Polygon
4. Avalanche
5. Fantom
6. Velas
7. Gnosis Chain (former xDai)
8. Fuse
9. Harmony
10. IoTeX
11. Aurora (Layer 2 of NEAR)
12. Quarz (Unique Network's Kusama Parachain)
13. Godwoken (wip)
14. GateChain (wip)
15. BTT (wip)

with 4+ Non-EVM ones:

1. Elrond
2. Algorand
3. Tezos
4. Tron
5. Secret Network (Cosmos ecosystem) (wip)


  </div>
</details>

## What NFT standards does the bridge support?

<details>
  <summary>Answer</summary>
  <div>

At the moment of writing the bridge supports:

1. [ERC-721](https://eips.ethereum.org/EIPS/eip-721)/[ERC-1155](https://eips.ethereum.org/EIPS/eip-1155) fro Ethereum, Ploygon, Aurora, Fuse, Velas
2. [BEP-721](https://academy.binance.com/en/glossary/bep-721)/BEP-1155 for BSC
3. [TRC-721](https://developers.tron.network/docs/token-issuance)/TRC-1155 for Tron & BTT
4. [XRC-721/XRC-1155](https://iotex.io/blog/how-to-mine-tokens-nfts/#non-fungible-tokens-xrc721) for IoTeX
5. [ESDT](https://docs.elrond.com/developers/esdt-tokens/) for Elrond
6. [ASA-003](https://developer.algorand.org/docs/get-details/asa/) for Algorand
7. [FA2](https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md) for Tezos
8. [SPL](https://spl.solana.com/token#non-fungible-tokens) for Solana
9. [ADR 43](https://docs.cosmos.network/master/architecture/adr-043-nft-module.html#adr-43-nft-module) for Cosmos Ecosystem
10. [NEP-178](https://nomicon.io/Standards/NonFungibleToken/ApprovalManagement#nep-178) for NEAR Protocol

<br/>
  </div>
</details>

## What is the difference between EVM and Non-EVM chains?

<details>
  <summary>Answer</summary>
  <div>

EVM stands for Ethereum Virtual Machine - the major invention that differentiated Ethereum from Bitcoin. The virtual machine allows adding and running the third-party code on a live blockchain without stopping it. Ethereum VM accepts code in Solidity - the first smart contract language.

The chains that adopted EVM support the Solidity SC language, Metamask wallet, web3, and ethers JavaScript libraries. Ropsten, Truffle, and Hardhat can be used for deploying and interacting with the smart contract uploaded on the testnets and the mainnets of such chains. The infrastructure built for one such chain can be reused on all the rest of them with minimal effort and changes. The chains support the same or very similar token standards making them interoperable and easy to transfer. 

However, a misconception is that integrating an EVM chain is a walk in a park. There are numerous factors why capricious chain nodes may crush, fail to feed events, or provide irrelevant on-chain data. Such bridge tools as NFT-Indexer, fee estimator and currency converter require meticulous fine-tuning, monotonous tests, and adjustments for every single chain. The bridge validators must be "acquainted" with the new smart contracts they have to protect and interact with.

Non-EVM blockchains are custom made starting from the smart contract language, which can be Rust, C++, TEAL, Michelson, !Ink, Plutus, etc., ending with unusual token standards and chain rules. Very few developers know those languages at the level necessary for writing secure and cost-efficient smart contracts complying with the intended business logic requirements and interacting with the off-chain oracles and validators the bridge relies on. Therefore, Non-EVM chain integration is time-consuming hard work with no or very few well-trodden routes. It explains why there are so few Non-EVM NFT bridges, why emerging of every such bridge is a big event for the industry, and why Xp.network is the only NFT bridge for Elrond, Tezos, and Algorand.
  </div>
</details>


## Are the royalties preserved on the target chain?

<details>
  <summary>Answer</summary>
  <div>
On the chain of origin the NFT is locked in the bridge SC and is a part of the smart contract where it was minted, so any attached logic applies to it.

On the target chain to support any logic, including royalties the wrapped NFT should be minted with the smart contract that has the required logic.

This will be possible with latest smart contracts we have recently developed. It will be the first bridge that allows transferring logic togeather with the NFTS.
  </div>
</details>

## Why is smart contract whitelisting required

<details>
  <summary>Answer</summary>
  <div>

Many blockchain industry related cyber attacks involve maliciously crafted smart contracts. To reduce the impact area of the bridge infrastructure to interaction with trusted smart contracts whitelisting is essential.
  </div>
</details>

## How to whitelist a smart contract for the bridge to accept it?

<details>
  <summary>Answer</summary>
  <div>

In order for a smart contract to be whitelisted there are several steps:

1. The smart contract must be verified on the chain and its source code readable
2. An e-mail with a request should be sent to dima@xp.network and kint@xp.network:
    
    The message should contain the following information:
      1. Blockchain name(Ethereum, BSC, Avalanche, Polygon, etc.)
      2. Smart contract address
      3. Approximate number of NFTs planned for sending

3. XP.network team members will look through the source code of the NFT smart contract
4. The smart contract will be whitelisted or the initiator will be notified that the smart contract has the code that can harm the bridge therefore, it cannot be whitelisted.


  </div>
</details>

## When did the NFT Bridge launch?

<details>
  <summary>Answer</summary>
  <div>

### Testnet
**July 2021.** The first testnet bridge between Elrond and HECO was developed.<br/>
**August 2021.** Transformation into a Multi-Chain bridge.<br/>
**September 2021.** Ropsten, BSC testnet, Polygon Mumbai, Harmony, and Celo testnets were the experimental platforms for where the bridge matured.

### Mainnet
**October 31, 2021.** The production bridge launched, connecting the mainnets of Ethereum, BSC, Polygon, Elrond, and Fantom.<br/>
**November 2021.** Tron, Avalanche, and xDai were added.<br/>
**December 2021.** Algorand and Fuse were integrated.<br/>
**January 2021.** Velas and Tezos were joined.<br/>
**February 2021.** IoTeX, Harmony, Aurora and Quarz are integrated.<br/>
  </div>
</details>

## At what stage of development is XP.network Now?

<details>
  <summary>Answer</summary>
  <div>

We're currently hardening and making the bridge relay validator network scalable while the target chain transaction fees many times cheaper.

We've developed and audited the bridge support for ERC-1155 smart contracts, custom collection names on the target chains and for the first time in the history of the industry - transferring NFTs with the logic of the original smart contracts.

Such big and important ecosystems as Solana, EOS, NEAR, Cardano, and Cosmos, among the rest, are planned for integration in 2022.
  </div>
</details>

## When will the bridge validators become decentralized?

<details>
  <summary>Answer</summary>
  <div>
At the moment, the pace of development is ultra-fast. Had the validators already been decentralized, the entities controlling them would have to update and restart them every two or three days to catch up with the latest code updates. Failing to do so would put at risk the new chains since very few validators, if any, would be aware that it is time to validate the new chains or that a new feature or a bug fix is available. Since the validators could be anonymous, the team would have no guaranteed ways of informing the validators about the necessity to update, making the chain integration process even more difficult and unpredictably long.

However, once the pace of changes falls, we will outsource the bridge validation to third parties incentivizing the community members and well-known industry influencers to further secure and harden the bridge by decentralizing it.
  </div>
</details>
