---
sidebar_label: '9. TIP-62'
sidebar_position: 9
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---
# TIP-62

TIP-62 is an NFT smart contract standard on TON finalized on 01.02.2022.[^1]

In TON every NFT is a smart contract, and there's a separate smart contract for a collection. 

|Contract|Number of contracts|
|:-:|:-:|
|NFT|$\sum = ID_0 ~ ... ~ ID_{n-1}$|
|Collection|1|

## An $NFT ~ contract$:

An NFT contract may have any arbitrary functionality as long as it implements the following obligatory functions:

1. `transfer` - which moves ownership from the current owner to a new one. It has the following parameters:
   - `query_id:uint64` - an arbitrary request number
   - `new_owner:MsgAddress` - an address of the token receiver
   - `response_destination` - an address for notification messages and unused tokens refund
   - `custom_payload:(Maybe ^Cell)` - optional arbitrary data of any type
   - `forward_amount:(VarUInteger 16)` - several TONs to be transferred to the NFT recipient
   - `forward_payload:(Either Cell ^Cell)` - optional arbitrary data, for example, a message to the receiver
2. `get_static_data` - it has only one parameter, `query_id:uint64`
   - 

## An $NFT ~ collection$:

1. `get_collection_data()` - returns a tuple:
   - `int next_item_index` - the number of the last minted NFT + 1
   - `cell collection_content` - the collection metadata defined by the standard [TIP-64](./TON64.md)
   - `slice owner_address` - the address of the collection owner
2. `get_nft_address_by_index(int index)` - gets an NFT token ID called `index` and returns the smart contract address of the selected NFT.
3. `get_nft_content(int index, cell individual_content)` - queried by an NFT ID and individual data and returns the complete NFT metadata defined by the standard [TIP-64](./TON64.md)

## Yet Unsolved
1. The contract cannot be queried for a list of NFT owners.
2. `safeTransfer` returning the NFTs to the original owner should the contract fail to execute is not implemented.

## Accepted and discussed extensions

1. **NFTRoyalty** (TIP-66)[^2] (Accepted)
   - `royalty_params()` - returns a tuple:
     - `int numerator` - the divided
     - `int denominator` - the divisor
     - `slice destination` - the address of the beneficiary
<br/>Example: <br/>

  $$ 
  RoyaltyPercent = numerator/denominator
  $$

2. [NFTBouncable](https://github.com/ton-blockchain/TIPs/issues/67) (TIP-67) - standardizes the rollback in case of an error.
3. [NFTEditable](https://github.com/ton-blockchain/TIPs/issues/68)(TIP-68) - an account with an `editor` role can massively update NFT content.
4. [NFTUpgradable](https://github.com/ton-blockchain/TIPs/issues/69) (TIP-69) - currently closed without being accepted.

[^1]: https://github.com/ton-blockchain/TEPs/blob/master/text/0062-nft-standard.md

[^2]: https://github.com/ton-blockchain/TEPs/blob/master/text/0066-nft-royalty-standard.md