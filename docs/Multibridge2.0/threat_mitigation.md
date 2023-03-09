---
sidebar_label: '20. Threat Mitigation'
sidebar_position: 20
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---

# Bridging Threats and their Mitigation

Bridges can be broadly divided into **centralized** and **decentralized**. Both types have their benefits and drawbacks:

<center>

<div>

|Bridge Type|$\color{green}Pros$|$\color{red}Cons$|
|:-:|:-:|:-:|
|**Centralized**|1. Contract errors can be fixed<br/>2. User errors can be fixed|1. The team can steal assets, <br/>2. Censorship[^1]|
|**Decentralized**|No trusted entity required|Bugs in code cannot be fixed, <br/> Human error cannot be fixed|

</div>

</center>

As we can see from the table above, the advantages of one type are exactly the drawbacks of the other. Fortunately, all the drawbacks can be risk managed and risks minimized:

<center>

<div>

|Bridge Type|$\color{red}Cons$|$\color{green}Mitigation$|
|:-:|:-:|:-:|
|**Centralized**|1. The team can steal assets, <br/>2. Censorship|Team use a multisignature where one member's signature is not enough|
|**Decentralized**|1. Bugs in code cannot be fixed, <br/> 2. Human error cannot be fixed|1. SC's are audited before use in production<br/>2. The team creates documentation to instruct/warn the users|

</div>

</center>

## Common Mitigation mechanisms

> 1. Validators must undergo a KYC procedure. Validators anonymity can be sacrificed for higher security. If one or multiple validators misbehave, they risk criminal prosecution in real rather than virtual worlds.

> 2. The bridge should be equipped with double-checking mechanisms. Every transaction must be checked for consistency, where a state change on one chain only happens if the state changes on the initiating chain.

> 3. Every bridge transaction must be assigned a unique identifier. The contracts and the validators should ensure the same transaction is not running multiple times. However, if a transaction is reverted, the transaction ID must be removed to allow another attempt.

> 4. Similar transactions (initiated by the same user) should be prohibited in the same block. It could protect from some forms of reentrancy attacks.

> 5. Another reentrancy protection mechanism could be explicitly assigning minimal required gas so that a function can only be called once at a time.

> 6. Chain agnostic oracle-validators should run independently of whether the chains they support are up or down. While observing that one or several blockchains are down, validators may signal to each other and any externally requesting entities that transactions to and from an irresponsive chain will fail if attempted. But it should neither crush nor stop the validators from doing their job for the rest of the chains.

> 7. Validators scaling can be achieved by using the Schnorr algorithm, allowing the generation of one public and private key pair from an arbitrary number of multisignature signers with a given threshold, for example, BFT (2/3+1). It allows having an unlimited amount for off-chain validators without impacting the transaction cost or security.


## Arguable Mitigation Strategies

|💡 Original Idea 💡| ⛔ Arguments Against ⛔|
|:-:|:-:|
|Bridge Transaction IDs should be nonces that cannot be repeated. Any repetition is a red flag indicating an attempt of a breach.|If a transaction failed for the reasons of lack of tokens or other user or even node errors, it would be impossible to try it later, when the fees are lower, or the target chain nodes are up, no longer congested, or fixed.|
| Signed destination transactions that did not go through must be stored on IPFS for anyone to attempt running them once the chain is up|It is a dangerous idea to let stransgers run valid, properly formed and signed transactions that the target chain contract will accept. They can be used to form a different valid transaction by adding a meaningless nonce to match the signature wich will lead to either passing assets to a wrong(malicious) receiver, or change the amount.|


[^1]: By censorship, we mean that a centralized team of the bridge can decide which tokens to bridge, which creates unequal conditions in the competitive market.
