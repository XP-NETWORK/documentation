---
sidebar_label: '6. FA 2.0 - Tezos NFT'
sidebar_position: 6
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---

# FA 2.0 - Tezos NFT Standard

Similarly to ERC-1155 standard, FA 2.0 can hold multiple assets, while it is mostly used as a ledger for Non-Fungible tokens.

The standards was initially proposed in [TZIP-12](https://gitlab.com/tezos/tzip/-/tree/master/proposals/tzip-12) where `TZIP` stands for "Tezos Improvement Process".

The standard describes the major features of the contract the community members should respect to seamlessly view, display, transfer, create and destroy the tokens.

The requirements were conveniently summarized by a Tezos team member Adam Shindler in his Medieum blog ["Tezos Token Standards Simply Explained"](https://medium.com/tezos-israel/tezos-token-standards-simply-explained-352e76c1ee5b). The table below is a slightly modified version of Adam's ideas.

## The main contract requirements

|Function|Presence|Description|
|:-|:-|:-|
|TokenName|optional|Collection name|
|Symbol|optional|Token ticker|
|Decimal|optional|Denomination in 0-18 decimals|
|Transfer|obligatory|Enables token transfers between users and contracts|
|Operators|obligatory|Sets multiple wallets for multiple assets that third party wallets can manage on behalp of the Owner|
|Metadata|obligatory|The pointer to the asset metadata JSON, regulated by the TZIP-016|
|BalanceOf|obligatory|Returns the user's balance, returns multiple token pairs, if specified|
|TotalSupply|obligatory|Returns the total number of tokens in the collection|
|AllTokens|obligatory|Returns the collection token IDs|

## Smart contract in SmartPy

The tutorial suggested by the standard suggests a contract in LOGO. We're suggesting our implementation of the contract in SmartPy, another high level language that compiles to Michelson, the assembly language developed for Tezos blockchain smart contracts.

The contract below inherits from the contract implementation in SmartPy from the official languege site and implements additionally the minting & burning functionaluty required for the bridge.

The contract below is used as a default recipient of the NFTs on the Tezos side in case only one or few NFTs are transferred. For migrating an entire collection it is a better idea to deploy a new smart contract bearing the collection name and ticker and additional business logic relevant to the project.

```python
import os
import dotenv
import smartpy as sp

# The original token standard implemented in SmartPy
FA2 = sp.io.import_script_from_url('https://smartpy.io/templates/FA2.py')


class XPNFT(FA2.FA2):

    # MINTING
    @sp.entry_point
    def mint(self, params):
        sp.set_type(
            params,
            sp.TRecord(
                token_id=sp.TNat,
                address=sp.TAddress,
                metadata=sp.TMap(
                    sp.TString, sp.TBytes
                ),
                amount=sp.TNat
            )
        )

        sp.verify(self.is_administrator(sp.sender),
                  message=self.error_message.not_admin())
        
        # If Fungible tokens
        if self.config.single_asset:
            sp.verify(params.token_id == 0,
                      message="single-asset: token-id <> 0")
        # If non-fungible tokens
        if self.config.non_fungible:
            sp.verify(params.amount == 1, message="NFT-asset: amount <> 1")
            sp.verify(
                ~ self.token_id_set.contains(
                    self.data.all_tokens, params.token_id),
                message="NFT-asset: cannot mint the same token twice"
            )
        user = self.ledger_key.make(params.address, params.token_id)
        with sp.if_(self.data.ledger.contains(user)):
            self.data.ledger[user].balance += params.amount
        with sp.else_():
            self.data.ledger[user] = FA2.Ledger_value.make(params.amount)
        with sp.if_(~ self.token_id_set.contains(self.data.all_tokens, params.token_id)):
            self.token_id_set.add(self.data.all_tokens, params.token_id)
            self.data.token_metadata[params.token_id] = sp.record(
                token_id=params.token_id,
                token_info=params.metadata
            )
        if self.config.store_total_supply:
            self.data.total_supply[params.token_id] = params.amount + \
                self.data.total_supply.get(params.token_id, default_value=0)


    # BURNING
    @sp.entry_point
    def burn(self, params):
        sp.set_type(params, sp.TRecord(token_id=sp.TNat, address=sp.TAddress, amount=sp.TNat))
        sp.verify(self.is_administrator(sp.sender), message = self.error_message.not_admin())
        # We don't check for pauseness because we're the admin.
        if self.config.single_asset:
            sp.verify(params.token_id == 0, message = "single-asset: token-id <> 0")
        if self.config.non_fungible:
            sp.verify(params.amount == 1, message = "NFT-asset: amount <> 1")
            # sp.verify(
            #     ~ self.token_id_set.contains(self.data.all_tokens, params.token_id),
            #     message = "NFT-asset: cannot mint twice same token"
            # )
        user = self.ledger_key.make(params.address, params.token_id)
        with sp.if_(self.data.ledger.contains(user)):
            self.data.ledger[user].balance = sp.as_nat(self.data.ledger[user].balance - params.amount)
        with sp.else_():
            self.data.ledger[user] = FA2.Ledger_value.make(params.amount)
            
        sp.verify(self.token_id_set.contains(self.data.all_tokens, params.token_id), "token-id doesn't exists.")
            
        if self.config.store_total_supply:
            self.data.total_supply[params.token_id] = sp.as_nat(self.data.total_supply.get(params.token_id, default_value = 0) - params.amount)
```

## Interacting with the contract on Tezos

Our JavaScript library has a helper for interactions with the Bradge smart contract on Tezos. It is available in our [GitHub](https://github.com/XP-NETWORK/xpjs/blob/secretjs/src/helpers/tezos.ts).