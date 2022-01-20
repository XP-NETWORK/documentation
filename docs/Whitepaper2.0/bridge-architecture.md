---
sidebar_label: 'Bridge architecture'
sidebar_position: 3
---

# Bridge architecture

The cross-chain bridge is the key element of the XP.network ecosystem. It has two key elements: smart contracts and relay validators. Their synergy allows users to send NFTs minted on one chain to any other of the connected chains. For example, an NFT minted on Solana can be sent to Ethereum to be listed on OpenSea, or to a BSC-based marketplace like OpenBiSea, or to Snowflake on Avalanche, and so forth.

The idea is to give users full freedom to dispose of their NFTs and to benefit from the opportunities on different chains. For now these opportunities are mainly limited to selling and storage, but in the near future new applications for NFTs may arise – for example, using them as collateral for loans. Some of these applications may even emerge within the XP.network ecosystem thanks to the upcoming dApp editor.

As of the time of writing, bridges to the following networks have been completed: Avalanche, BSC, Celo, Elrond, Ethereum, Fantom, Harmony, HECO, Ontology, Polygon, Tron

Work is ongoing or will soon start on bridging XP.network to the following chains: Algorand, Cardano, Solana

Any two chains that are connected to the XP.network bridge are thus also indirectly bridged to each other. So, for example, users can send NFTs from Binance Smart Chain to Avalanche, or from Elrond to Polygon. The internal mechanics of such a transfer is more complex than when transferring an NFT minted on the bridge itself, but for the end user the flow is just as smooth and simple.

## Smart contracts

Smart contracts are external pieces of code embedded in and executed by a blockchain. They are immutable; a smart contract’s behavior is deterministic and defined by its built-in logic. Each bridge contract is compiled in the language used by the hosting chain, be it Solidity, Rust, TEAL, Plutus, C++, etc.

All contracts are hosted on-chain under the control of the hosting blockchain’s validators. The validators prevent any deviation from the initially designed behavior by rejecting transactions that contradict it (see ‘Bridge Security’).

The contracts serve the following functions:

Mint native or wrapped NFTs;
Freeze an NFT before it is transferred to the target chain;
Release the NFT to the designated address on the hosting blockchain;
Broadcast bridge-related events to the relay validators;
Collect Byzantine Fault-tolerant multisinatures.

## Bridging flow from the end user’s viewpoint
Below is a short description of what the XP.network experience looks like for a regular user who wishes to send an NFT to another blockchain.

1. The user – we will call him Bob – first connects the wallet where his NFTs are stored to XP.network. The process is the same as for linking a wallet to a DeFi dapp.
2. The user account associated with Bob’s wallet is injected into the bridge. The bridge has a whitelisted database of NFT smart contracts, which it scans to find any NFTs that exist on Bob’s account. In more basic terms, the bridge looks for NFTs in the wallet.
3. All found NFTs are displayed in the XP.network UI (user interface). Bob can then locate the NFT he wishes to send.
4. Bob selects the origin chain (where his NFT currently resides – for example, BSC) from a drop-down list, and the target chain where the NFT should be sent – for example, Avalanche.
5. Bob also needs to provide the recipient address on the target chain – for instance, his own Avalanche-compatible wallet address.
6. By clicking on ‘Transfer’, Bob creates a request for transferring the NFT to the chosen account on Avalanche.
7. The bridge smart contract locks the NFT in its storage and broadcasts an event to the bridge relay validators, giving them all the needed information about the locked NFT and the account it should be sent to.
8. Once a validator detects the event, they send a message to the target chain (Avalanche) to find out how much the transaction fee is.
9. The validator notifies Bob of the transaction fee size and asks him to confirm that the fee should be deduced from his account via the wallet supported by the origin blockchain (in our case BSC).
10. The validator waits for confirmation that Bob has paid the transaction fee.
11. Once the fee has been paid, the validator signs the transfer transaction. This transaction is a tiny file containing the following instructions:
    
    i. which NFT should be transferred;

    ii. to which account on the target blockchain;

    iii. transaction fee to be paid to the target chain.

12. At least ⅔ +1 of the validators need to sign the transaction. The bridge smart contract on the target chain collects these signatures, and once the required majority has been reached, the contract mints a wrapped NFT. This new NFT points to the original NFT and has the same metadata.
13. The wrapped NFT is sent to the recipient account on Avalanche, while the original NFT goes into custody, where it will be stored until (or in case if) Bob decides to transfer the NFT back to the original chain.
14. If an error occurs along the way, the NFT will be returned to Bob’s account on the original blockchain (BSC).

## Wrapped NFTs and NFT custody
When a non-fungible asset is sent through the bridge, the NFT on the original chain doesn’t disappear; rather, it goes into custody in the bridge smart contract. If the holder eventually decides to transfer the NFT back where it came from, the original NFT will be extracted from the custody wallet and restituted to the user’s account, while the NFT that was generated by the bridge on the target chain will become inaccessible (which is the closest equivalent of destroying an asset that exists on blockchain).

Wrapping blockchain assets became popular with the spread of DeFi, as users wished to be able to use their BTC to earn money with DeFi lending and trading. Since Bitcoin is incompatible with Ethereum-based DeFi protocols, the best solution was to issue an Ethereum equivalent of BTC: wBTC, or wrapped Bitcoin. The mechanics is similar to XP.network: users deposit BTC in custody and receive wBTC in return. Once they are done with their DeFi activities, they can return the wBTC (which are ‘destroyed’) and claim the original Bitcoins from the custodian, which charges a fee for this service.

The popular Ren protocol, with [over $770M in value locked](https://defipulse.com/) as of October 1, 2021, works in the same way. RenVM takes custody of non-Ethereum assets (be in BTC, ZEC, BCH) and issues renBTC, renZEC etc.

Wrapping NFTs isn’t a completely new concept, either, though so far it has been limited to wrapping non-fungibles into regular ERC-20 tokens that represent the floor value of an NFT collection (the minimum price at which regular NFTs from a collection sell at a given moment). Thus, there is WCK, or Wrapped Kitties (for CryptoKitties) and PUNKS for CryptoPunks.

As for wrapping NFTs into new NFTs on a different blockchain, so far there are very few projects offering this functionality (see ‘Competition’). None of them support as many chains as XP.network, and in many cases XP.network is the absolute first to offer an NFT bridge for a certain pair of blockchains.

When designing the NFT custody system, the XP.network made a choice in favor of a centralized custody system. This way the NFTs will enjoy the same superior level of protection as the rest of the XP.network infrastructure (see ‘Bridge security’). While we did consider various decentralized custody options, none of them can ensure the same level of security. Further, all the stakeholders of XP.network are completely public, starting from the CEO, and bear responsibility for the preservation of the NFTs held in custody. This level of confidence is not possible when working with anonymous custodians.