---
sidebar_label: '4. Fee Estimation'
sidebar_position: 4
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---

# Fee Estimation

In April 2019, EIP-1159 proposed a new fee structure for Ethereum transactions to improve the predictability of transaction fees and reduce fee volatility. The key concept in EIP-1159 is that transactions now include a "tip" or "priority fee" paid by the sender in addition to the base fee. This base fee dynamically adjusts block by block based on network demand to keep blocks from getting too full.

In the context of your question, EIP-1159 and EIP-2718 are interacting to define the transaction fee for the new transaction type introduced by EIP-2718. Let's break down the process of fee estimation based on the information provided:

### Intrinsic Cost Calculation (EIP-2718)

The intrinsic cost of the new transaction introduced by EIP-2718 is determined based on various factors, including the transaction type (TransactionType 2), calldata bytes (both zero and non-zero), access list storage key count, and access list address count. The formula for intrinsic cost is:
$$
21000 \\ + 16 * non-zero~calldata~bytes \\ + 4 * zero~calldata~bytes \\ + 1900 * access~list~storage~key~count \\ + 2400 * access~list~address~count
$$

### TransactionPayload Signature
The transaction includes a secp256k1 signature that covers specific fields of the transaction, including `chain_id`, `nonce`, `max_priority_fee_per_gas`, `max_fee_per_gas`, `gas_limit`, `destination`, `amount`, `data`, and `access_list`. This signature ensures the authenticity and integrity of the transaction.

```ts
@dataclass
class Transaction1559Payload:
	chain_id: int = 0
	signer_nonce: int = 0
	max_priority_fee_per_gas: int = 0
	max_fee_per_gas: int = 0
	gas_limit: int = 0
	destination: int = 0
	amount: int = 0
	payload: bytes = bytes()
	access_list: List[Tuple[int, List[int]]] = field(default_factory=list)
	signature_y_parity: bool = False
	signature_r: int = 0
	signature_s: int = 0
```

### Transaction Fee Calculation (EIP-1159)
With EIP-1159, the transaction fee consists of the base and priority fees (tip). The base fee is dynamically adjusted block by block based on network demand to maintain a target block gas utilization. Miners include transactions in a block based on the total fee, which is the sum of the base fee and the priority fee. The sender pays the priority fee to incentivize miners to quickly include the transaction in the block.

### Effective Gas Price Calculation
The GASPRICE opcode (0x3a) returns the `effective_gas_price` as defined in the reference implementation. This `effective_gas_price` takes into account the base fee and the priority fee of the transaction.

In summary, estimating the user's transaction fee involves calculating the intrinsic cost of the new EIP-2718 transaction, including calldata, access list information, etc. Then, EIP-1159 comes into play by adding the dynamically adjusted base fee and the sender's chosen priority fee (tip) to determine the total fee. The GASPRICE opcode returns the effective_gas_price that encapsulates these components. This mechanism provides more transparency and stability in fee calculations for Ethereum transactions.


## Use-case Example

When you send a transaction on Ethereum, you can specify the amount of gas you will pay. It serves as a bid to include your transaction in the upcoming block. If you offer too little, validators might delay or ignore your transaction. Conversely, overpaying means wasting ETH. How can you determine the right amount?

Gas fees consist of the `base fee` and the `priority fee` (tip).

The base fee is protocol-defined; it's the minimum needed for a valid transaction.

The priority fee is an extra amount you add to the base fee. It incentivizes validators to prioritize your transaction in the block.

While a transaction covering only the base fee is valid, it's less likely to be picked because it lacks incentive. The 'correct' priority fee depends on network activity when you send your transaction. Higher demand may require a higher priority fee, while lower demand lets you pay less.

For instance, consider Alice owing Bob 1 ETH. A standard ERC20 transfer costs $21,000$ gas units, with a 10 gwei base fee. Alice adds a 2 gwei tip.

Total fee equals:

$$
gas~units~used * (base~fee + priority~fee)
$$

Base fee is set by protocol, and priority fee is your chosen tip.

So, $21,000 * (10 + 2) = 252,000 gwei$ (or 0.000252 ETH).

Upon sending, Alice's account deducts 1.000252 ETH, Bob receives 1.0000 ETH, and the validator gets a 0.000042 ETH tip. The base fee of 0.00021 ETH is burned.

## Gas estimation from code

Here's a general outline of how you might estimate fees using TypeScript with ethers.js, a commonly used Ethereum library:

```ts
import { ethers } from 'ethers';

// Initialize a provider
const provider = new ethers.providers.JsonRpcProvider('YOUR_ETHEREUM_RPC_URL');

// Define transaction parameters
const fromAddress = 'YOUR_SENDER_ADDRESS';
const toAddress = 'YOUR_RECEIVER_ADDRESS';
const valueInEth = 1; // Amount of ETH you want to send

async function estimateGasAndFees() {
  try {
    // Estimate gas limit
    const gasLimit = await provider.estimateGas({
      from: fromAddress,
      to: toAddress,
      value: ethers.utils.parseEther(valueInEth.toString()),
    });

    // Get current gas price
    const gasPrice = await provider.getGasPrice();

    // Calculate total estimated fees
    const totalFees = ethers.utils.formatUnits(gasPrice.mul(gasLimit), 'gwei');

    console.log(`Gas Limit: ${gasLimit}`);
    console.log(`Gas Price: ${ethers.utils.formatUnits(gasPrice, 'gwei')} gwei`);
    console.log(`Total Fees: ${totalFees} gwei`);
  } catch (error) {
    console.error('Error estimating gas and fees:', error);
  }
}

estimateGasAndFees();
```