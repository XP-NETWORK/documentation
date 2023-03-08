---
sidebar_label: '14. Bridge Security'
sidebar_position: 14
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---

import ReactPlayer from 'react-player'

# Bridge Security

<ReactPlayer className="introduction-player" controls url='https://www.youtube.com/watch?v=SQe8zx-0bo0&t=0s' />

We've heard about multiple bridge hacks; the most recent is the Harmony Horizon cryptocurrency bridge. According to Fortune magazine, it is the third FT bridge that has fallen victim to an attack this year. 

![1](/security/1.png)

## Bridge compromises in 2022

This February, hackers managed to pull $300M from the Wormhole bridge. In late March, Ronin Bridge lost around 620 million dollars. On June 24th, the Harmony team acknowledged a theft of tokens worth approximately one hundred thousand dollars, pushing the total loss from bridge hacks to over 1 billion dollars this year alone. Most of those hacks are associated with private key compromise.

## Cryptocurrency bridges' hacks

You might have already noticed that we're speaking about FT bridges, but we have not heard about NFT bridge hacks, and let's see why.

![2](/security/2.png)

The FT bridge theft pipeline is somewhat different from the NF one. The reason is the nature of the tokens. FTs are completely interchangeable. The value of 1 FT is 100% equal to that of another FT of the same type. If two users exchange the same amount of tokens of the same type, both sides will feel it was a fair exchange.

The Pipeline begins with compromising a token bridge connecting two or more chains. While stealing the funds from the bridges' liquidity pools, Hackers inevitably leave some footprints.

![3](/security/3.png)

After several minutes or hours, the malicious agents may pass to the second stage to cover up their identity while leaving more feet and fingerprints. Cryptocurrency exchanges with automatic market makers are a perfect tool for money laundering and hiding the criminal nature of the attackers' accounts. By manipulating the liquidity pools, the criminals may introduce other "clean" account holders of the token pairs. Creating immense disbalance inside the token pairs allows the second "clean" accounts to sell their tokens at immensely high prices, while it will be hard to prove the connection between the two accounts. They can do more steps to cover the connection between the "clean" and the criminal accounts.

![4](/security/4.png)

After successful money laundering, the adversaries can pass to the final stage where they cash their revenue using "clean" accounts and get away. 

## Hypothetical NFT bridges' hacks

![5](/security/5.png)

NFT theft pipeline is more risky and complicated. NFTs are not as liquid and cannot be cashed so soon due to their nature. No two NFTs are equal in value. The blind exchange of NFTs will leave at least one side unhappy because such things as artistic, historic, and esthetic values cannot be precisely converted to numbers. 

A hypothetical hacker killer chain should begin with a bridge compromise and valuable NFT theft. Then the question arises - what to do with the unique one-of-a-kind assets in an ecosystem where every step is transparent to all the participants?

![6](/security/6.png)

Listing a hacked NFT on a marketplace is like selling a recently stolen authentic DaVinci canvas on Sotheby's with an incredible discount from the market price. The community members will raise the red flags and shout on every possible media channel that the seller is a criminal and the buyer is taking advantage of the theft, marking both criminals.

![7](/security/7.png)

Months, years later, or in the worst case for the thieves' scenarios never, they will pass to the cashing stage. Because NFTs are unique, any transaction involving them leaves a permanent fingerprint on the blockchain trie. This fact can easily lead cyber investigators to the accounts cashing the resulting tokens and arrest the individuals controlling them.

## Layered Security

![8](/security/8.png)

Although NFTs are a less desirable loot than FTs, we are preparing for the worst and building a multilayer defense system around the assets of the bridge users. 

Cyber specialists like comparing such systems with an onion due to its wrapping skins. Another popular analogy is a castle where breaking one wall does not immediately open the way to plunder but leads to another wall with more towers and dungeons, each threatening the intruder.

At the heart of our bridge reside NF assets. Their immediate dungeon is the smart contract written with an emphasis on effectiveness and security. Audits and pentests ensure the holes and backdoors are sealed, and no one can easily sneak into the most protected area.

Validators are the garrison of the castle. They work as a team but do not completely trust each other. Their 2/3 majority consensus is required for a transaction to be relayed from one chain to another. They sign their votes with a cryptographically secured multisignature. Having the latest development in computation brute-forcing their private keys would take millions of years. Other tools and modules require role-based, frequently updated JWT tokens. 
We use the modular architecture of the tools to switch between malfunctioning and backing ones quickly. Some of the modules diagnose the vitality of the others and signal the bridge about the problems. Most of the components are self-healing to ensure 24/7 accessibility. The servers and databases used for NFT caching are sharded, and the hard drives are mirrored to provide data integrity and accessibility.

To avoid single points of failure, our servers and suppliers are redundant. The DMZ is protected by firewalls implementing whitelisting, meaning all incoming calls are denied except those from the whitelist. TLS certificates protect all the data on the move.

To prevent fishing and social engineering attacks, we work on our employees' awareness and keep them alert. We craft traps and honeypots to track and identify attacks at early stages.

## Crypto-industry best practices

![9](/security/9.png)

Besides, we follow the crypto-industry best practices in the smart contracts pipeline from development to deployment on the mainnets and usage. We collaborate with industry-acknowledged auditing companies. We trust Hacken to audit all our EVM contracts. And we rely on Certik to ensure our Non-EVM contracts a void of vulnerabilities and broken logic. 

We run functional tests to ensure the contract functions behave as expected regardless of the input. We conduct intrinsic code reviews to remove obvious errors and improve the architecture. We try our contracts in the testnets of the integrated chains and run internal pen-testing.

Then we show the code to external parties. The first to code-review our contracts are the blockchain teams. Then we send the contracts to professional auditors. If they manage to find additional issues, we fix them and receive a finalized report that becomes publicly available. Only then are the contracts deployed on the mainnets and available for public use.

# Why Fungible Token Bridge Attacks are irrelevant for the NFT Bridge

<ReactPlayer className="introduction-player" controls url='https://youtu.be/aEVbVgnrT5c&t=0s' />