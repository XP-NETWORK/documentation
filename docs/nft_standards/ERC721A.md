---
sidebar_label: '2. ERC-721A'
sidebar_position: 2
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---

# ERC-721A

The standard was proposed as an improvement of ERC-721. Therefore, it almost completely repeats the standard, but the trailing `a` indicates additional functionality.

The standard concentrates on saving the gas fee costs for the user by allowing multiple minting for the cost of a single mint in the original ERC721 standard.

## It is all about memory.

While in the original ERC721, the ledger is stored in mappings:

```ts
// Mapping from token ID to owner address
mapping(uint256 => address) private _owners;
    
// Mapping owner address to token count
mapping(address => uint256) private _balances;
```

In Solidity, both `uint256` and `address` occupy 32 bytes. So, every time we add a new record to the contract storage, we pay for storing another 64 bytes in the worst-case scenario.

The proposers of the ERC-721a standard are storing the ledger quite differently. They decided to go from bytes to bits:

```ts
// Mapping from token ID to ownership details
// An empty struct value does not necessarily mean the token is unowned.
// See {_packedOwnershipOf} implementation for details.
//
// Bits Layout:
// - [0..159]   `addr`
// - [160..223] `startTimestamp`
// - [224]      `burned`
// - [225]      `nextInitialized`
// - [232..255] `extraData`
mapping(uint256 => uint256) private _packedOwnerships;

// Mapping owner address to address data.
//
// Bits Layout:
// - [0..63]    `balance`
// - [64..127]  `numberMinted`
// - [128..191] `numberBurned`
// - [192..255] `aux`
mapping(address => uint256) private _packedAddressData;
```

The mappings still hold $2 x 32 = 64$ byte pairs, but this time only several bits are replaced in the value slot, which allows saving on gas substantially.

## Accessing bits:

To access the required bits of the storage the proposal authors have developed a system of bitmasks shifting the bits in the slot by a set number.

```ts
// Mask of an entry in packed address data.
uint256 private constant _BITMASK_ADDRESS_DATA_ENTRY = (1 << 64) - 1;

// The bit position of `numberMinted` in packed address data.
uint256 private constant _BITPOS_NUMBER_MINTED = 64;

// The bit position of `numberBurned` in packed address data.
uint256 private constant _BITPOS_NUMBER_BURNED = 128;

// The bit position of `aux` in packed address data.
uint256 private constant _BITPOS_AUX = 192;

// Mask of all 256 bits in packed address data except the 64 bits for `aux`.
uint256 private constant _BITMASK_AUX_COMPLEMENT = (1 << 192) - 1;

// The bit position of `startTimestamp` in packed ownership.
uint256 private constant _BITPOS_START_TIMESTAMP = 160;

// The bit mask of the `burned` bit in packed ownership.
uint256 private constant _BITMASK_BURNED = 1 << 224;

// The bit position of the `nextInitialized` bit in packed ownership.
uint256 private constant _BITPOS_NEXT_INITIALIZED = 225;

// The bit mask of the `nextInitialized` bit in packed ownership.
uint256 private constant _BITMASK_NEXT_INITIALIZED = 1 << 225;

// The bit position of `extraData` in packed ownership.
uint256 private constant _BITPOS_EXTRA_DATA = 232;

// Mask of all 256 bits in a packed ownership except the 24 bits for `extraData`.
uint256 private constant _BITMASK_EXTRA_DATA_COMPLEMENT = (1 << 232) - 1;

// The mask of the lower 160 bits for addresses.
uint256 private constant _BITMASK_ADDRESS = (1 << 160) - 1;
```

## Limitations

The storage improvements came at a cost. To avoid the overflow problem, the maximum number of tokens minted in one contract is limited to 5,000.

```ts
// The maximum `quantity` that can be minted with {_mintERC2309}.
// This limit is to prevent overflows on the address data entries.
// For a limit of 5000, a total of 3.689e15 calls to {_mintERC2309}
// is required to cause an overflow, which is unrealistic.
uint256 private constant _MAX_MINT_ERC2309_QUANTITY_LIMIT = 5000;
```

## Transfer

Excluding the pre transfer checks the core transfer looks like this:

```ts
// Underflow of the sender's balance is impossible because we check for
// ownership above and the recipient's balance can't realistically overflow.
// Counter overflow is incredibly unrealistic as `tokenId` would have to be 2**256.
unchecked {
    // We can directly increment and decrement the balances.
    --_packedAddressData[from]; // Updates: `balance -= 1`.
    ++_packedAddressData[to]; // Updates: `balance += 1`.

    // Updates:
    // - `address` to the next owner.
    // - `startTimestamp` to the timestamp of transfering.
    // - `burned` to `false`.
    // - `nextInitialized` to `true`.
    _packedOwnerships[tokenId] = _packOwnershipData(
        to,
        _BITMASK_NEXT_INITIALIZED | _nextExtraData(from, to, prevOwnershipPacked)
    );

    // If the next slot may not have been initialized (i.e. `nextInitialized == false`) .
    if (prevOwnershipPacked & _BITMASK_NEXT_INITIALIZED == 0) {
        uint256 nextTokenId = tokenId + 1;
        // If the next slot's address is zero and not burned (i.e. packed value is zero).
        if (_packedOwnerships[nextTokenId] == 0) {
            // If the next slot is within bounds.
            if (nextTokenId != _currentIndex) {
                // Initialize the next slot to maintain correctness for `ownerOf(tokenId + 1)`.
                _packedOwnerships[nextTokenId] = prevOwnershipPacked;
            }
        }
    }
}
```

## Minting

Minting looks like this:

```ts
// Overflows are incredibly unrealistic.
// `balance` and `numberMinted` have a maximum limit of 2**64.
// `tokenId` has a maximum limit of 2**256.
unchecked {
    // Updates:
    // - `balance += quantity`.
    // - `numberMinted += quantity`.
    //
    // We can directly add to the `balance` and `numberMinted`.
    _packedAddressData[to] += quantity * ((1 << _BITPOS_NUMBER_MINTED) | 1);

    // Updates:
    // - `address` to the owner.
    // - `startTimestamp` to the timestamp of minting.
    // - `burned` to `false`.
    // - `nextInitialized` to `quantity == 1`.
    _packedOwnerships[startTokenId] = _packOwnershipData(
        to,
        _nextInitializedFlag(quantity) | _nextExtraData(address(0), to, 0)
    );

    uint256 toMasked;
    uint256 end = startTokenId + quantity;

    // Use assembly to loop and emit the `Transfer` event for gas savings.
    // The duplicated `log4` removes an extra check and reduces stack juggling.
    // The assembly, together with the surrounding Solidity code, have been
    // delicately arranged to nudge the compiler into producing optimized opcodes.
    assembly {
        // Mask `to` to the lower 160 bits, in case the upper bits somehow aren't clean.
        toMasked := and(to, _BITMASK_ADDRESS)
        // Emit the `Transfer` event.
        log4(
            0, // Start of data (0, since no data).
            0, // End of data (0, since no data).
            _TRANSFER_EVENT_SIGNATURE, // Signature.
            0, // `address(0)`.
            toMasked, // `to`.
            startTokenId // `tokenId`.
        )

        for {
            let tokenId := add(startTokenId, 1)
        } iszero(eq(tokenId, end)) {
            tokenId := add(tokenId, 1)
        } {
            // Emit the `Transfer` event. Similar to above.
            log4(0, 0, _TRANSFER_EVENT_SIGNATURE, 0, toMasked, tokenId)
        }
    }
    if (toMasked == 0) revert MintToZeroAddress();

    _currentIndex = end;
}
```

## SFTs inside ERC721

Surprisingly, the standard support Semi-Fungible token minting. The main difference between SFTs from NFTs is that while it is a token with an ID, it has an amount or quantity greater than one.

```ts
// Overflows are unrealistic due to the above check for `quantity` to be below the limit.
unchecked {
    // Updates:
    // - `balance += quantity`.
    // - `numberMinted += quantity`.
    //
    // We can directly add to the `balance` and `numberMinted`.
    _packedAddressData[to] += quantity * ((1 << _BITPOS_NUMBER_MINTED) | 1);

    // Updates:
    // - `address` to the owner.
    // - `startTimestamp` to the timestamp of minting.
    // - `burned` to `false`.
    // - `nextInitialized` to `quantity == 1`.
    _packedOwnerships[startTokenId] = _packOwnershipData(
        to,
        _nextInitializedFlag(quantity) | _nextExtraData(address(0), to, 0)
    );

    emit ConsecutiveTransfer(startTokenId, startTokenId + quantity - 1, address(0), to);

    _currentIndex = startTokenId + quantity;
}
```

## Burning

The internal burning after all checks boils down to:

```ts
// Underflow of the sender's balance is impossible because we check for
// ownership above and the recipient's balance can't realistically overflow.
// Counter overflow is incredibly unrealistic as `tokenId` would have to be 2**256.
unchecked {
    // Updates:
    // - `balance -= 1`.
    // - `numberBurned += 1`.
    //
    // We can directly decrement the balance, and increment the number burned.
    // This is equivalent to `packed -= 1; packed += 1 << _BITPOS_NUMBER_BURNED;`.
    _packedAddressData[from] += (1 << _BITPOS_NUMBER_BURNED) - 1;

    // Updates:
    // - `address` to the last owner.
    // - `startTimestamp` to the timestamp of burning.
    // - `burned` to `true`.
    // - `nextInitialized` to `true`.
    _packedOwnerships[tokenId] = _packOwnershipData(
        from,
        (_BITMASK_BURNED | _BITMASK_NEXT_INITIALIZED) | _nextExtraData(from, address(0), prevOwnershipPacked)
    );

    // If the next slot may not have been initialized (i.e. `nextInitialized == false`) .
    if (prevOwnershipPacked & _BITMASK_NEXT_INITIALIZED == 0) {
        uint256 nextTokenId = tokenId + 1;
        // If the next slot's address is zero and not burned (i.e. packed value is zero).
        if (_packedOwnerships[nextTokenId] == 0) {
            // If the next slot is within bounds.
            if (nextTokenId != _currentIndex) {
                // Initialize the next slot to maintain correctness for `ownerOf(tokenId + 1)`.
                _packedOwnerships[nextTokenId] = prevOwnershipPacked;
            }
        }
    }
}
```

## Extra Data

23 last bytes can be populated with arbitrary additional data. 

Extra data can be directly set by the index of the pair in the mapping:
```ts
    /**
    * @dev Directly sets the extra data for the ownership data `index`.
    */
    function _setExtraDataAt(uint256 index, uint24 extraData) internal virtual {
      uint256 packed = _packedOwnerships[index];
      if (packed == 0) revert OwnershipNotInitializedForExtraData();
      uint256 extraDataCasted;
      // Cast `extraData` with assembly to avoid redundant masking.
      assembly {
          extraDataCasted := extraData
      }
      packed = (packed & _BITMASK_EXTRA_DATA_COMPLEMENT) | (extraDataCasted << _BITPOS_EXTRA_DATA);
      _packedOwnerships[index] = packed;
}
```

Jumping to the next additional data record:
```ts
/**
     * @dev Returns the next extra data for the packed ownership data.
     * The returned result is shifted into position.
     */
    function _nextExtraData(
        address from,
        address to,
        uint256 prevOwnershipPacked
    ) private view returns (uint256) {
        uint24 extraData = uint24(prevOwnershipPacked >> _BITPOS_EXTRA_DATA);
        return uint256(_extraData(from, to, extraData)) << _BITPOS_EXTRA_DATA;
    }
```

## ERC-721a support in the XP.NETWORK Bridge

In the next iteration of the bridge improvement in Q4 2022, the bridge will add support to the new ERC-721a standard. Upon agreement with NFT Collection Teams, the bridge will convert the original standard to the improved one to save on the transaction costs on the destination chain.