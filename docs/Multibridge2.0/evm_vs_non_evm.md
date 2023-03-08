---
sidebar_label: '13. EVM and Non-EVM Chain Integration'
sidebar_position: 13
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---

import ReactPlayer from 'react-player'

# EVM and Non-EVM Chain Integration


<ReactPlayer className="introduction-player" controls url='https://www.youtube.com/watch?v=wQx1J7FzT2o&t=0s' />


## Solidity Smart Contract Example

Solidity is a Turing complete programming language designed specifically for writing smart contracts that can be further compiled to binary code and deployed on the Ethereum Virtual machine and execute its logic without stopping and forking the chain.

```js
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

contract HelloXP {

    // Contract Storage
    string public _say;
    address private owner;

    // Events
    event SetSay(string what);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    // Contructor
    constructor(string memory what){
        _say = what;
        owner = msg.sender;
    }

    // Functions
    function setSay(string memory what) external onlyOwner {
        _say = what;
        emit SetSay(what);
    }
}
```

## ABI - Application Binary Interface (fragment)

ABI is a JSON-formed mapping of the binary code which allows interacting with the smart contract from outside. It contains the function signatures including the expected types of arguments.

```json
{
	"functionDebugData": {
		"@_36": {
			"entryPoint": null,
			"id": 36,
			"parameterSlots": 1,
			"returnSlots": 0
		},
		"abi_decode_available_length_t_string_memory_ptr_fromMemory": {
			"entryPoint": 615,
			"id": null,
			"parameterSlots": 3,
			"returnSlots": 1
		},
		"abi_decode_t_string_memory_ptr_fromMemory": {
			"entryPoint": 690,
			"id": null,
			"parameterSlots": 2,
			"returnSlots": 1
		},
		"abi_decode_tuple_t_string_memory_ptr_fromMemory": {
			"entryPoint": 741,
			"id": null,
			"parameterSlots": 2,
			"returnSlots": 1
		},
		"allocate_memory": {
			"entryPoint": 476,
			"id": null,
			"parameterSlots": 1,
			"returnSlots": 1
		},
		"allocate_unbounded": {
			"entryPoint": 328,
			"id": null,
			"parameterSlots": 0,
			"returnSlots": 1
		},
        ...
    }
```

## Opcodes (fragment)

Opcodes partially solve the fact that the binary contract representation is not human readable. It resembles an assembler language working with the processor and its stack.

```
"opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH3 0x11 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x40 MLOAD PUSH3 0x980 CODESIZE SUB DUP1 PUSH3 0x980 DUP4 CODECOPY DUP2 DUP2 ADD PUSH1 0x40 MSTORE DUP2 ADD SWAP1 PUSH3 0x37 SWAP2 SWAP1 PUSH3 0x2E5 JUMP JUMPDEST DUP1 PUSH1 0x0 SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH3 0x4F SWAP3 SWAP2 SWAP1 PUSH3 0x98 JUMP JUMPDEST POP CALLER PUSH1 0x1 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP POP PUSH3 0x39A JUMP JUMPDEST DUP3 DUP1 SLOAD PUSH3 0xA6 SWAP1 PUSH3 0x365 JUMP JUMPDEST SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x1F ADD PUSH1 0x20 SWAP1 DIV DUP2 ADD SWAP3 DUP3 PUSH3 0xCA JUMPI PUSH1 0x0 DUP6 SSTORE PUSH3 0x116 JUMP JUMPDEST DUP3 PUSH1 0x1F LT PUSH3 0xE5 JUMPI DUP1 MLOAD PUSH1 0xFF NOT AND DUP4 DUP1 ADD OR DUP6 SSTORE PUSH3 0x116 JUMP JUMPDEST DUP3 DUP1 ADD PUSH1 0x1 ADD DUP6 SSTORE DUP3 ISZERO PUSH3 0x116 JUMPI SWAP2 DUP3 ADD JUMPDEST DUP3 DUP2 GT ISZERO PUSH3 0x115 JUMPI DUP3 MLOAD DUP3 SSTORE SWAP2 PUSH1 0x20 ADD SWAP2 SWAP1 PUSH1 0x1 ADD SWAP1 PUSH3 0xF8 JUMP JUMPDEST JUMPDEST POP SWAP1 POP PUSH3 0x125 SWAP2 SWAP1 PUSH3 0x129 JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST JUMPDEST DUP1 DUP3 GT ISZERO PUSH3 0x144 JUMPI PUSH1 0x0 DUP2 PUSH1 0x0 SWAP1 SSTORE POP PUSH1 0x1 ADD PUSH3 0x12A JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x40 MLOAD SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0x1F NOT PUSH1 0x1F DUP4 ADD AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 
...
```

## Binary Code

This is the compact machine readable representation of the contract deployable on a running chain.

```
60806040523480156200001157600080fd5b5060405162000980380380620009808339818101604052810190620000379190620002e5565b80600090805190602001906200004f92919062000098565b5033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506200039a565b828054620000a69062000365565b90600052602060002090601f016020900481019282620000ca576000855562000116565b82601f10620000e557805160ff191683800117855562000116565b8280016001018555821562000116579182015b82811115620001
```

## Cross-Chain Compatibility

### Wallets
+ Metamask
+ WalletConnect
+ TrustWallet

### JavaScript Libraries
+ web3.js
+ ethers.js

### Token standard compatibility
+ ERC20
+ ERC721
+ ERC721A
+ ERC1155
+ ERC1155D

## Drawbacks of EVM

||Problem|description|
|:-:|:-|:-|
|1|Fundamentally Unsafe|Solidity language allows its developers leaving fundamental security mistakes that lead to backdoors, privilege escalations and contract takeover.|
|2|Turing Complete|Solidity allows entering into loops causing reentrancy attacks to already called functions inside one block before the storage is changed causing the multi-million damage to companies and individuals.|
|3|Same tech|Once hacked a pattern can be replicated on multiple chains causing technological epidemia due to usage of the same technology.|
|4|Congestion periods|During peak hours gas rates skyrocket and transactions with low gas are not included into blocks for hours or days.|

## Non-EVM Chains in the Bridge

At the moment of writing the bridge supports 4:

||Name|SC Language|NFT Standards|Wallets|JS Libraries|
|:-:|:-:|:-:|:-:|:-:|:-:|
|<img src="/logos/1200px-Elrond_Network_logo.svg.png" width="120%"/>|Elrond|Rust|ESDT|Maiar, Maiar Extension|@elrondnetwork/erdjs|
|<img src="/logos/tron-trx-logo.png" width="90%"/>|Tron|Solidity|TRC721, TRC1155|TronLink|Tronweb, tronstation|
|<img src="/logos/blue-logo-branding-design-set-58-1151645508462em4xq3mo3y.webp" width="100%" styles="border-radius:40%"/>|Tezos|SmartPy, Michelson|FA2|Beacon, Templar|@taquito/|
|<img src="/logos/Algorand.png" width="100%"/>|Algorand|PyTeal, TEAL|ASA-003|Algosigner|algosdk|

...and is in the process of integration of 4 more Non-EVM chains.

||Name|SC Language|NFT Standards|Wallets|JS Libraries|
|:-:|:-:|:-:|:-:|:-:|:-:|
|<img src="/logos/Secret.png" width="100%"/>|Secret Network|Rust|Snip 721|Cosmostation, Kepl|secretjs|
|<img src="/logos/Solana_logo.png" width="100%"/>|Solana|Rust|Metaplex|TronLink|Tronweb, tronstation|
|<img src="/logos/internet-computer-icp-logo.png" width="100%" styles="border-radius:40%"/>|Internet Computer|Rust|ICP-721, EXT|Beacon, Templar|@taquito/|
|<img src="/logos/The_Open_Network_logo.png" width="100%"/>|TON|TypeScript|TIP-62, TIP-64|Ton Wallet|tonweb|

## Impact of the Integration

The more differences there are, the longer the learning curve and the development time to integrate a blockchain.

We have to:
1. Rewrite the bridge smart contracts from scratch to replicate the logic in the language and technological paradigms of a new protocol.
2. Integrate additional wallets
3. Adjust to another JS Library.
4. Adapt the bridge to the new tokens standards.

