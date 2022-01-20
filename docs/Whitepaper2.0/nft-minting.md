---
sidebar_label: 'Chain-agnostic NFT minting on XP.network'
sidebar_position: 3
---

# Chain-agnostic NFT minting on XP.network

Apart from sending NFTs from one blockchain to another, XP.network has an NFT minting module. Users can create new NFTs on any of the bridged chains. The UI (user experience) and the minting flow are the same for all the chains.

There are several important advantages to such chain-agnostic minting:

**1) It’s OpenSea-compatible.** The resulting NFTs comply with the OpenSea metadata standard, so that users can list them on OpenSea as if they were minted there.
   
**2) It’s cheaper.** The user can choose the chain with the lowest minting fees, then send the NFT to a marketplace or wallet of their choice on any chain.
   
**3) It’s great for marketing.** NFT projects that integrate XP.network will have a competitive advantage and a wider outreach. Right now some users can be reluctant to mint on Avalanche, for example, because they worry that the NFT community on this chain is still small and there will not be enough buyers in the future. XP.network solves this image problem common to smaller ecosystems, helping NFT projects to attract users faster.
   
**4) It supports EMV and non-EVM networks.** XP.network’s minting service is the first to be available both on those blockchains that use Ethereum Virtual Machine (Ethereum, Binance Smart Chain, Polygon) and those that don’t, such as Elrond, Cardano, Solana, Algorand, etc.
   
**5) It’s integrated with the bridge.** Any NFT minted using XP.network is automatically added to the bridge whitelist and can be sent to any connected chain.
   
To start minting, a user needs to have:

1) a wallet supported by the target blockchain: MetaMask for EVM-compatible chains and custom wallets for Solana, Cardano etc.;

2) enough coins of the target blockchain to pay the eventual minting fees;
   
3) an account on the target blockchain;
   
4) $XPNET to pay the XP.network fee (once the beta phase is complete).
   
If a user decides to mint an NFT with our bridge in any of the connected chains the same smart contract is used for minting native NFTs. It mints the NFT in such a way that it is compatible with the ERC-721 standard as well as OpenSea metadata standard making it transferable and visible in the bridged ledgers.