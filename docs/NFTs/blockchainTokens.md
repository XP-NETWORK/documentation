---
sidebar_label: 'Blockchain Tokens'
sidebar_position: 3
---

# Blockchain Tokens

**Blockchain coins** - are native currency of a blockchain. Sometimes they are controlled by a smart contract. In other cases the native chain coins are built in the public ledger code and do not require a smart contract. For example, ETH is supported by the Ethereum network.

**Fungible Tokens** are interchangeable public tenders usually controlled by smart contracts and used analogous to the traditional currencies like USD or EUR. The most popular smart contract for fungible tokens on Ethereum compatible chains is [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) which stands for Ethereum Request for Comments  number 20.

The fungible token is charachterized by its `name`, `symbol` and `decimals` the power of 10 it can be divided into. For example, `XPNET`, the token of XP.NETWORK has 18 decimals. It means that 1 `XPNET` == 1,000,000,000,000,000,000 or 10<sup>18</sup> `XP` the smallest fraction of the token. Its name is `XP.network`. Its symbol is `XPNET`.

The token's [smart contract](https://bscscan.com/token/0x8cf8238abf7b933bf8bb5ea2c7e4be101c11de2a#readContract) controlls the rules of creating (minting), destroying (burning) and transferring tokens form one account to another. The token Owner can "allow" another user or a smart contract  to become a `_spener` of a specified `_value` of fungible tokens.