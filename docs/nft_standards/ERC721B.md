---
sidebar_label: '3. ERC-721B'
sidebar_position: 3
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---

# ERC-721B

The standard ERC721B[^1] was suggested as an improvement of [ERC721](./ERC721.md) but without the drawbacks of the [ERC721A](./ERC721A.md) such as integer overflow for collections over 5,000 items.

## Transaction fee effectiveness

The standard allows users to save on transaction fees only when minting or burning tokens in batches.

Here's the original [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol) implementation of the internal `_mint` function:

```ts
function _mint(address to, uint256 tokenId) internal virtual {
    require(to != address(0), "ERC721: mint to the zero address");
    require(!_exists(tokenId), "ERC721: token already minted");

    _beforeTokenTransfer(address(0), to, tokenId, 1);

    // Check that tokenId was not minted by `_beforeTokenTransfer` hook
    require(!_exists(tokenId), "ERC721: token already minted");

    unchecked {
        // Will not overflow unless all 2**256 token ids are minted to the same owner.
        // Given that tokens are minted one by one, it is impossible in practice that
        // this ever happens. Might change if we allow batch minting.
        // The ERC fails to describe this case.
        _balances[to] += 1;
    }

    _owners[tokenId] = to;

    emit Transfer(address(0), to, tokenId);

    _afterTokenTransfer(address(0), to, tokenId, 1);
}
```

The same function in the [ERC721B](https://github.com/badbabybearbots/ERC721B/blob/main/contracts/ERC721B.sol) looks like this[^2]:

```ts
function _mint(
    address to,
    // parameter removed and replaced with auto incrementing logic
    // uint256 tokenId,
    // additional parameter
    uint256 amount,
    // additional parameter
    bytes memory _data,
    // additional parameter
    bool safeCheck 
  ) private {
    // Instead of: `require(to != address(0), 
    // "ERC721: mint to the zero address");`
    if(amount == 0 || to == address(0)) revert InvalidCall();
    // Auto tokenId increment
    // Removes the `require(!_exists(tokenId), 
    // "ERC721: token already minted");`
    uint256 startTokenId = _lastTokenId + 1; 
    
    _beforeTokenTransfers(address(0), to, startTokenId, amount);
    
    unchecked {
      // - Additional storage operation + 5,000 gas
      // for each update
      _lastTokenId += amount;
      // balances are increased by the amount not +1
      // + SUBSTANTIAL ECNOMY HERE !!!
      _balances[to] += amount;
      // = Same as in standard ERC721
      _owners[startTokenId] = to;

      _afterTokenTransfers(address(0), to, startTokenId, amount);

      uint256 updatedIndex = startTokenId;
      uint256 endIndex = updatedIndex + amount;

      if (safeCheck && to.code.length > 0) {
        do {
          emit Transfer(address(0), to, updatedIndex);
          // Checks if a contract implements ERC721Receiver
          if (!_checkOnERC721Received(address(0), to, updatedIndex++, _data))
            revert ERC721ReceiverNotReceived();
        } while (updatedIndex != endIndex);
        return;
      }

      do {
        emit Transfer(address(0), to, updatedIndex++);
      } while (updatedIndex != endIndex);
    }
  }
```

## ERC721B Extensions

|Functionality|ERC721B|
|:-:|:-:|
|`tokenURI(uint256 tokenId)`<br/>`baseTokenURI()`<br/>`_setBaseURI(string memory uri)`|ERC721BBaseTokenURI.sol|
|`ownerOf(uint256 tokenId)`<br/>`totalSupply()`<br/>`burn(uint256 tokenId)`<br/>`_exists(uint256 tokenId)`|ERC721BBurnable.sol|
|`contractURI()`|ERC721BContractURIStorage.sol|
|`_beforeTokenTransfers(address from,address to,uint256 startTokenId,uint256 amount)`|ERC721BPausable.sol|
|`isTransferConsumed(address from,address to,uint256 tokenId,uint256 nonce)`<br/>`signedTransferFrom(address from,address to,uint256 tokenId,uint256 nonce,bytes memory signed)`<br/>`signedTransferFrom(address from,address to,uint256 tokenId,uint256 nonce,bytes memory signed,bytes memory _data)`|ERC721BSignedTransfer.sol|
|`tokenURI(uint256 tokenId)`<br/>`staticTokenURI(uint256 tokenId)`<br/>`_setTokenURI(uint256 tokenId, string memory _tokenURI)`|ERC721BStaticTokenURI.sol|
|`name()`<br/>`symbol()`|ERC721Metadata.sol|

## Drawbacks:

1. TX fee improvements only for batch minting
2. Automatic `tokenId` handling (requires logic rewriting for target mapped contracts to accept tokens with native ID)

## Summary:

After carefully studying the above implementation we see room for further TX fee improvements which we will describe in our following documents.


[^1]: https://github.com/badbabybearbots/ERC721B

[^2]: Original inline comments were replaced with XP.NETWORK explanations.