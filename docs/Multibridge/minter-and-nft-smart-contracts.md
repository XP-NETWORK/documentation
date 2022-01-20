---
sidebar_label: 'Minter & NFT Smart Contracts'
sidebar_position: 3
---

# Minter & NFT Smart Contracts

<hr/>

The Solidity Smart Contracts represent the bridge on the EVM compatible blockchains such as BSC, Ethereum & HECO.

1. XPNet.sol - is the ERC-1155 Smart Contract
2. Minter.sol - is responsible for the rest of the multibridge-related functionality.

<hr/>

## 1. XPNet.sol: ERC-1155

This is the smart contract which is responsible for executing all minting and burning related functions.

The reason why ERC-1155 is used is because it is known as semi-fungible token standard for operating both fungible and non-fungible tokens, allowing for the minting, wrapping and sending/receiving of tokens.

By leveraging the 1155 standard, a number of interesting primitives can be developed, such as streaming payments of fungible tokens to a non-fungible token, or nesting child NFTs into parent NFTs, etc.

The following are the core functions comprising the XPNet smart contract:

### Smart Contract Declaration

```Solidity
contract XPNet is ERC1155, Ownable { ... }
```

### Minting

```Solidity
function mint(address to, uint256 id, uint256 amount) public onlyOwner {
    _mint(to, id, amount, "");
}
```

### Burning

```Solidity
function burn(address from, uint256 id, uint256 amount) public onlyOwner {
		_burn(from, id, amount);
}
```

<hr/>

## 2. Minter.sol

This is the bridge smart contract which emits event data and coordinates actions between other blockchains and validators.

The target smart contract collects the signatures of the validators and once the Byzantine Fault Tolerance threshold is achieved the transaction executes in the target blockchain and the smart contract releases tokens to the target account.

The below are some examples of the functions which this smart contract carries out, more detailed functions can be found in this section:

### Smart Contract Declaration

```Solidity
contract Minter { 
  uint256 private threshold;         // BFT threshold
	uint256 private action_cnt = 0;		 // Action counter
	uint256 private nft_cnt = 0x10000; // reserve 0 - 0xffff for chain liquidity
	XPNet   private token;						 // XPNET token
}
```

### Events emitted by the SC for the bridge relay validators

```Solidity
event Transfer(
    uint256 action_id, 
    uint64 chain_nonce, 
    string to, 
    uint256 value); // Transfer ETH to XP.network
    
event TransferErc721(
    uint256 action_id, 
    uint64 chain_nonce, 
    string to, 
    string data); // Transfer Erc721 to XP.network
    
event TransferErc1155(
    uint256 action_id, 
    uint64 chain_nonce, 
    string to, 
    uint256 id, 
    address contract_addr); // Transfer Erc1155 to XP.network
    
event Unfreeze(
    uint256 action_id, 
    uint64 chain_nonce, 
    string to, 
    uint256 value); // Unfreeze XPNET on XP.network
    
event UnfreezeNft(
    uint256 action_id, 
    string to, 
    string data); // Unfreeze NFT on XP.network

```

### Validators mapper

```Solidity
mapping (uint128=>ActionInfo) private actions;
mapping (uint128=>mapping (address=>uint8)) private action_validators;
```