---
sidebar_label: '13. ICRC-7'
sidebar_position: 13
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---

# ICRC-7 Internet Computer NFT Standard

[ICRC-7](https://github.com/dfinity/ICRC/tree/main/ICRCs/ICRC-7) defines a new standard for implementing Non-Fungible Tokens (NFTs) on the [Internet Computer](https://internetcomputer.org/). This document provides a clear and easy-to-understand explanation of the standard, along with examples in Rust.

The standard defines the rules of
1. Collection deployment
2. NFT minting
3. Querrying the storage variables

Yet, NFT burning was not defined by the standard. However, NFT burning is essential in the cross-chain bridging pipeline, ensuring assets' non-duplication. Therefore, XP.NETWORK extended the standard by implementing the burning functionality in the wrapped collection canisters.

## Account

An individual or entity represented by a `principal` can have multiple accounts. Each account is identified by a unique 32-byte string called a subaccount. Therefore, an account is denoted by the pair `(principal, subaccount)`.

The account identified by the subaccount with all bytes set to 0 is considered the "default account" of the `principal`.

```rust
type Subaccount = blob;
type Account = record {
    owner : principal;
    subaccount : opt Subaccount;
};
```


## Methods

### 1. Collection level Methods

The standard has two methods semantically similar to those of ERC721Metadata, while some key methods are missing: `baseURI()` and `_burn(owner, tokenId)`, `tokenURI(tokenId)`.

|#|Method name|Functionality|
|:-:|:-:|:-:|
|1.1|`icrc7_name`|Retrieve the name of the NFT collection <br/>(e.g., "My NFT Collection").<br/> `icrc7_name : () -> (text) query;`|
|1.2|`icrc7_symbol`|Retrieve the symbol of the collection <br/>(e.g., "MNC").<br/> `icrc7_symbol : () -> (text) query;`|
|1.3|`icrc7_description`|Get the text description of the collection.<br/>`icrc7_description : () -> (opt text) query;`|
|1.4|`icrc7_image`| Get a link to the collection image. It may be a DataURL containing the actual image.<br/>`icrc7_image : () -> (opt text) query;`|
|1.5|`icrc7_total_supply`|Retrieve the total number of NFTs across all accounts.<br/>`icrc7_total_supply : () -> (nat) query;`|
|1.6|`icrc7_supply_cap`| Retrieve the maximum number of NFTs allowed for this collection. Any attempt to mint more NFTs than this supply cap will be rejected.<br/>`icrc7_supply_cap : () -> (opt nat) query;`|
|1.x|`icrc7_collection_metadata`|Returns all the collection-level metadata of the NFT collection in a single query.|

### 1.x icrc7_collection_metadata implementation example

```rust
icrc7_collection_metadata : () -> record {
    // Similar to ERC721Metadata:
    icrc7_name : text;
    icrc7_symbol : text;
    // key missing methods from ERC721Metadata:
    // 1. baseURI() - the common part of the collection
    // 2. _burn(owner, tokenId)
    // 3. tokenURI(tokenId) a token's unique URI

    // Similar to ERC721Enumerable:
    icrc7_total_supply : nat;

    // Different from ERC721 & its extensions:
    icrc7_description : opt text;
    icrc7_image: opt text;  // The URL of the token logo or the actual image if it's a Data URL.
    icrc7_supply_cap : opt nat;
    // Royalty-related
    icrc7_royalties : opt nat16;
    icrc7_royalty_recipient : opt Account;
} query;
```

### 2. Royaly-related methods

Note that only one royalty can be specified per collection. For more complex use cases, consider using a fee splitter.

|#|Method name|Functionality|
|:-:|:-:|:-:|
|2.1|`icrc7_royalties`|Get the default royalty percentage in basis points (e.g., 150 means 1.50%). <br/>`icrc7_royalties : () -> (opt nat16) query;`|
|2.2|`icrc7_royalty_recipient`| Retrieve the default royalty recipient. The specified account must be capable of handling arbitrary ICRC-1 tokens, as royalties may be paid in any token.<br/>`icrc7_royalty_recipient : () -> (opt Account) query;`|

### 3. NFT-related methods

|#|Method name|Functionality|
|:-:|:-:|:-:|
|3.1|`icrc7_metadata`|Get token metadata for a specific tokenId.<br/>`icrc7_metadata : (nat) -> (vec record { text; Metadata }) query;`|
|3.2|`icrc7_owner_of`|Retrieve the owner of a tokenId.<br/>`icrc7_owner_of : (nat) -> (Account) query;`|
|3.3|`icrc7_balance_of`|Retrieve the balance of a specified account.<br/>`icrc7_balance_of : (Account) -> (nat) query;`|
|3.4|`icrc7_tokens_of`|Retrieve the tokenIds owned by a specified account.<br/>`icrc7_tokens_of : (Account) -> (vec nat) query;`|
|3.5|`icrc7_transfer`|Transfer one or more tokens from an account. The result is either the transaction index of the transfer or an error.<br/>`icrc7_transfer : (TransferArgs) -> (variant { Ok: nat; Err: TransferError; });`|
|3.6|`icrc7_approve`|`icrc7_approve : (ApprovalArgs) -> (variant { Ok: nat; Err: ApprovalError; });`|

### 4. Standard support

This method is semantically similar to the [ERC165](https://eips.ethereum.org/EIPS/eip-165) detecting the supported functionality.

|#|Method name|Functionality|
|:-:|:-:|:-:|
|4.1|`icrc7_supported_standards`|Retrieve the list of standards implemented by this ledger. Refer to the "Extensions" section for details. <br/>`icrc7_supported_standards : () -> (vec record { name : text; url : text }) query;`|

### 5. Standard-defined Types

Metadata can be of 4 types: a natural number, an integer, a text, or a binary large object.

```rust
type Metadata = variant { Nat : nat; Int : int; Text : text; Blob : blob };
```

If a tokenId doesn't exist or the caller's principal is not authorized to perform actions on the tokenId, the tokenId will be added to the `Unauthorized` list. If `is_atomic` is set to true (default behavior), the transfer of tokens in the `token_ids` list must either all succeed or all fail.

The `memo` parameter is an arbitrary blob without significance to the ledger. The ledger should support memos of at least 32 bytes in length. The ledger should use the memo argument for transaction deduplication.

```rust
type TransferArgs = record {
    spender_subaccount: opt blob; // Subaccount of the caller (used to identify the spender)
    from: Account;
    to: Account;
    token_ids : vec nat;
    // Type: Leave open for now
    memo: opt blob;
    created_at_time : opt nat64;
    is_atomic : opt bool;
};
```

The `created_at_time` parameter indicates the transaction's time in nanoseconds since the UNIX epoch in the UTC timezone when the client created the transaction. The ledger should reject transactions with `created_at_time` too far in the past or the future, returning `TooOld` and `CreatedInFuture` errors accordingly.

```rust
type TransferError = variant {
    Unauthorized: record { token_ids : vec nat };
    TooOld;
    CreatedInFuture : record { ledger_time: nat64 };
    Duplicate : record { duplicate_of : nat };
    TemporarilyUnavailable;
    GenericError : record { error_code : nat; message : text };
};
```

`ApprovalArgs` is a record type representing the arguments for the `icrc7_approve` method. It defines the parameters required to approve the transfer of NFTs to another account. Here's a breakdown of its fields:

`from_subaccount` (Optional Blob): This field specifies the subaccount associated with the caller's account, allowing identification of the spender.

`spender` (Account): It specifies the recipient account to which approval is granted. In the context of ICRC-7, this typically refers to an ICRC Account authorized to receive the NFTs.

`token_ids` (Optional Vector of Natural Numbers): This field is optional and represents a list of token IDs for which approval is granted. It's important to note that this field might be changed into a variant, indicating variations in the approval process.

`expires_at` (Optional 64-bit Natural Number): This optional field indicates the expiration time for the approval. After this time, the approval may no longer be valid.

`memo` (Optional Blob): An arbitrary binary data field that doesn't carry any specific meaning for the ledger. It can be used for additional information or notes related to the approval.

`created_at_time` (Optional 64-bit Natural Number): This field specifies the timestamp, in nanoseconds, since the UNIX epoch in the UTC timezone, when the approval transaction was created.

```rust
type ApprovalArgs = record {
    from_subaccount : opt blob;
    spender: Account;         // Approval is given to an ICRC Account
    token_ids : opt vec nat;   // TBD: change into variant?
    expires_at : opt nat64;
    memo: opt blob;
    created_at_time : opt nat64;
};
```

`ApprovalError` is a variant type that represents potential errors that can occur during the approval process. It includes the following possible error variants:

`Unauthorized`: This variant indicates that the approval request is not authorized and includes a list of unauthorized token IDs.

`TooOld`: This variant signifies that the approval transaction is too old to be processed.

`TemporarilyUnavailable`: This variant suggests that the approval process is temporarily unavailable or encountering issues.

`GenericError`: This variant represents a generic error scenario and includes additional details in a record, including an error code and message. It's used for reporting various other error conditions that don't fall into the other specified error variants.

```rust
type ApprovalError = variant {
    Unauthorized: vec nat;
    TooOld;
    TemporarilyUnavailable;
    GenericError : record { error_code : nat; message : text };
};
```

### Existing ICRC-7 implementations

1. [Pramitgaha/icrc7](https://github.com/pramitgaha/icrc7/tree/main/src/icrc7/src)
2. [XP.NETWORK](https://github.com/XP-NETWORK/dfinity-xpnft)

## XP.NETWORK's NFT Burning implementation

### `icrc7_burn` Function

This function is an update method that allows the burning (destruction) of an NFT with the specified `token_id`.

#### Parameters

- `token_id` (u128): The unique identifier of the NFT to be burned.

#### Returns

- `u128`: Returns an `u128` value, which may represent a success status or additional information about the burn operation.

#### Usage

This method is used to remove an NFT from the collection permanently. It checks if the caller owns the NFT and then burns it. Burning an NFT means it cannot be recovered, and its ownership is revoked.

#### Usage Example

```rust
// Import the IC SDK for caller identification
use ic_cdk::caller;

// Call the burn method with a specific token ID
let token_id = 123456789;
let result = icrc7_burn(token_id);

// Check the result to determine the success of the burn operation
if result == 0 {
    // NFT with token_id has been successfully burned
} else {
    // An error occurred during the burn operation
}
```

Notes
* Ensure the caller owns the NFT with the specified token_id before calling this method.
* Burning an NFT is an irreversible operation, and the NFT cannot be recovered after it has been burned.

Burning logic implementation:

```rust title="./src/xpnft/src/update_method.rs"
/// # ICRC-7 Burn Method
/// 
/// This function is an update method that allows the burning (destruction) of an NFT with the specified `token_id`.
/// 
/// ## Parameters
/// - `token_id` (u128): The unique identifier of the NFT to be burned.
/// 
/// ## Returns
/// - `u128`: Returns an `u128` value, which may represent a success status or additional information about the burn operation.
#[update]
#[candid_method(update)]
pub fn icrc7_burn(token_id: u128) -> u128 {
    let caller = ic_cdk::caller();

    COLLECTION.with(|c| {
        let mut c = c.borrow_mut();
        c.burn(&caller, &token_id)
    })
}
```

### `burn` function

This function allows the burning (destruction) of an NFT with the specified `id`. Burning an NFT means it is permanently removed from the collection, and ownership is revoked.

#### Parameters
- `caller` (&Principal): The principal representing the caller, typically the owner of the NFT.
- `id` (&u128): The unique identifier of the NFT to be burned.

#### Returns
- `u128`: Returns a `u128` value, which may represent the success status of the burn operation or additional information.

#### Behavior
- The function first checks if the provided `id` corresponds to a valid token in the collection. If not, it raises a trap with the message "Invalid Token ID."
- It then checks if the caller owns the NFT with `is_owner` and if the caller is approved to perform the burn operation with `is_approved`.
- If the caller is neither the owner nor approved, the function raises a trap with the message "Unauthorized Caller."
- If the caller is authorized, the function decrements the total supply of NFTs, removes the NFT with the specified `id` from the collection, and returns a transaction identifier.

#### Example
```rust
// Import the necessary modules and types
use ic_cdk::Principal;

// Specify the caller's principal and the ID of the NFT to burn
let caller_principal: Principal = // ...
let token_id: u128 = // ...

// Call the burn function to destroy the specified NFT,
let result = collection.burn(&caller_principal, &token_id);

// Check the result to determine the success of the burn operation
if result == 0 {
    // NFT with token_id has been successfully burned
} else {
    // An error occurred during the burn operation
}
```

## Notes
- Ensure that the caller is either the owner of the NFT or has been approved to perform the burn operation before calling this function.
- Burning an NFT is irreversible, and the NFT cannot be recovered once burned.
- The function returns a transaction identifier that can be used to track the status of the burn operation.

```rust title="./src/xpnft/src/state.rs"
/// # Burn NFT
/// 
/// This function allows the burning (destruction) of an NFT with the specified `id`. Burning an NFT means it is permanently removed from the collection, and ownership is revoked.
/// 
/// ## Parameters
/// - `caller` (&Principal): The principal representing the caller, typically the owner of the NFT.
/// - `id` (&u128): The unique identifier of the NFT to be burned.
/// 
/// ## Returns
/// - `u128`: Returns a `u128` value, which may represent the success status of the burn operation or additional information.
pub fn burn(&mut self, caller: &Principal, id: &u128) -> u128 {
  let token = self.tokens
    .get(&id)
    .unwrap_or_else(|| ic_cdk::trap("Invalid Token Id"));

  let is_owner = token.owner == default_account(*caller);
  let is_approved = token.approval_check(
    ic_cdk::api::time(), 
    &default_account(*caller)
  );

  if !is_owner && !is_approved {
      ic_cdk::trap("Unauthorized Caller")
  }

  self.total_supply -= 1;
  self.tokens.remove(id);
  let id = self.get_tx_id();
  id
}
```