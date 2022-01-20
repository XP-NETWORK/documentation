---
sidebar_label: 'Bridge Security'
sidebar_position: 7
---

# Bridge Security

## NIST framework
While developing the security protocols for the XP.network bridge, we have used NISTIR 8286A (2nd draft) - the Interagency Report 8286A, entitled ‘Identifying and Estimating Cybersecurity Risk for Enterprise Risk Management (ERM)’, by the US National Institute of Standards and Technology.

Apart from the report, we’ve aligned the cyber security risk management (CSRM) features of the NFT bridge with the NIST framework v1.1. The core of the framework are the five functions: Identify, Protect, Detect, Respond, and Recover. For each of these functions, there is a set of outcome categories – things that an organization has to do to keep its systems and users safe.

The following table summarizes how the NIST framework applies to the XP.network bridge infrastructure:

https://nvlpubs.nist.gov/nistpubs/ir/2021/NIST.IR.8286A-draft2.pdf
https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.04162018.pdf

Functions|	Implementation|	Categories|
|:---:|:---:|:---:|
Identify|	Understand the impact of cyber security risks on the bridge, its users and their assets (NFTs)|	Bridge Systems Users & Team Assets (NFTs)
Protect|	Safeguard persistent bridge functionality by limiting or containing the impact of potential security events|	Employee Identity management, <br/>Awareness & Training <br/>(users, employees), <br/>KYC Data Security, <br/>Bridge Maintenance <br/>in the working state
Detect|	Timely detect cybersecurity events by continuous monitoring|	SCs / Validators’ Anomalies Detecting Cyber Security Events
Respond|	Stopping, limiting or containing potential or ongoing incidents|	Incident response planning Incident mitigation roadmaps
Recover|	Restore the capabilities impacted by an event|	Backing up and recovery <br/>Hardening and resilience improvements

## Layers of security
Since risks can originate from multiple sources, we have implemented a layered security system where a potential penetration through one of the layers, instead of allowing the attacker to exploit a hypothetical vulnerability, exposes their ‘footprints’ to the internal security wardens. Meanwhile, the attacker runs into subsequent layers of protection that are even harder to penetrate.

## Smart contract audit
Due to the different nature of the bridge components, the means of their protection vary. As discussed earlier, the bridge consists of on-chain smart contracts, which are publicly available (and whose binary code can in many cases be restored to a human-readable form), and off-chain relay validators, responsible for mirroring the state of the source chain to the chosen target chain.

A smart contract requires proper code review, penetration testing, and audit before it is deployed to the blockchain. Once a contract goes live, any bugs or vulnerabilities in it cannot be fixed: the only remedy is to redeploy the contract from scratch.

Even the most popular smart contracts can contain vulnerabilities and get exploited; LarvaLabs’ famous CryptoPunk NFTs are a good example. As part of a community
https://github.com/larvalabs/cryptopunks/issues/1#issuecomment-309288762
loyalty campaign, every user who had a CryptoPunk could mint one random Meebit (a new type of digital character) for free. There was a small chance that the resulting Meebit would turn out to have rare features and thus would be very expensive. A user under the name 0xNietzsche found a way to exploit the contract and minted Meebits repeatedly with the same CryptoPunk until he obtained a rare Meebit, which he immediately sold for ETH 200, having spent only ETH 5 on transaction fees.

To avoid such mishaps, all XP.network smart contracts undergo meticulous testing before deployment, including penetration testing and code audit by the industry’s acknowledged security companies. Apart from verifying that there are no bugs and vulnerabilities, the audit confirms the integrity of the contract’s binary code and in the way data associated with it moves between accounts.

## Validator penetration testing
Off-chain relay validators are more complex than smart contracts, because they are composed of multiple parts residing on different physical or virtual machines. The first layer of security we apply to validators are the classic cyber security protocols that protect validators from physical access and human error.

Another preventive measure is validator penetration testing. It simulates attacks by black-hat (malicious) hackers, who range from professionals equipped with sophisticated hardware and software to young coding prodigies who may accidentally discover a contract vulnerability and exploit it, resulting in asset theft or reputational damage.

While XP.network will contract skilled white-hat hackers to simulate professional attacks, we will also introduce a community **bug bounty program** for users who can reproduce attacks by amateurs. These talented enthusiasts within the community will be rewarded if they discover unexpected and potentially dangerous contract behavior.

## Elliptic-curve cryptography and digital signatures
Asymmetric cryptography is the cornerstone of modern cyber security. Initially only governments had access to such tools, but in 1970 a pioneering paper entitled ‘New Directions in Cryptography’ (by Martin Hellman, Whitfield Diffie, and Ralph Merkle) opened up the possibilities of public-key cryptography to the wider world. Blockchain technology owes its existence to this fundamental breakthrough.

A blockchain account is in fact a key pair tuple (PK, SK). The PK or public key can be safely displayed anywhere and serves as a unique identifier of an otherwise anonymous user on the blockchain. Sometimes a public key is accompanied by a
https://etherscan.io/address/0x270ff2308a29099744230de56e7b41c8ced46ffb
chain-specific prefix like “0x” or “erd”, which can make it incompatible with other chains, even if they use the same encryption algorithm.

Private keys are used to sign transactions and must be kept secret from anyone except the owner of the account. A private key falling into the wrong hand will result in asset theft or other malicious activity on the chain.

One can derive an unlimited number of public keys from a single private key using so-called elliptic curve cryptography, but it’s impossible to recreate a private key based on a public key – at least within a reasonable amount of time and using today’s technology. There is a possibility that quantum computers of the future will be able to reverse-engineer private keys, but this should not become a practical concern for at least a few more years.

XP.network’s relay validators use blockchain key pairs to participate in the multisig process and submit their signatures to bridge smart contracts on target chains. The exact signature algorithm varies: most EVM-compatible chains use ECDSA (Elliptic Curve Digital Signature Algorithm), namely the secp256k1 curve for back compatibility with Bitcoin. Non-EVM chains like Elrond, Algorand, Solana, and Cardano use the Edwards Curve (Ed25519) algorithm. Ontology is EVM-compatible and uses ECDSA, but with the NIST P-256 curve.

## BFT tolerance and multisignature
A distributed system should be able to function even when some of its members (nodes) become unavailable or start behaving maliciously – in other words, it should be fault-tolerant. The term ‘Byzantine Fault Tolerance’ comes from a 1982 paper entitled “The Byzantine Generals Problem’. It describes a group of generals who have to arrive at a consensus decision by sending messengers to each other. However, some of the generals and messengers can be traitors and pass on false messages to sabotage the enterprise. The solution is to send more messengers than necessary, so that the whole army can still function if some of the agents become unreliable.

Replicating the messenger analogy, in XP.network a group of physically separated validators comprise the validator pool to avoid a single point of failure. In order for a transaction to be acknowledged as valid, a BFT threshold of ⅔ + 1 signatures must be collected. Signature collection takes place in the smart contract on the target blockchain bridge, which is immutable and protected by the blockchain’s validators. At least 67% of the validators must sign a proposed transaction for it to succeed.

Thanks to the BFT consensus, up to ⅓ of the validators can act maliciously or be down without any damage to the bridge functionality, since they will be ignored by the smart contracts. System consensus will still be reached even if 33% of the validators are down or attempt to act maliciously. It makes the system resistant to the notorious 51% or even 66% attacks.

While high availability of the validators is crucial for the bridge to work smoothly, sometimes validator nodes will go offline or lag. This can happen due to network congestion, cloud server maintenance, etc. There will be a threshold of downtime tolerance, but excessive downtime will be penalized – just like intentional misbehavior, such as double signing or signing transactions that other validators don’t confirm. The validators caught misbehaving are excluded from the pool, and their XPNET stakes are slashed (i.e. some of their XPNET are taken away as a fine).

## Network, Endpoint & Cloud Security requirements for the bridge validators
Since validators are composed of multiple components hosted on remote physical or virtual servers, they need a secure way to communicate with the bridged blockchains. The required validator cloud server settings are as follows:

Validators must be hosted behind a proxy firewall with a small number of whitelisted IP addresses.

Ports for accessing the instances must not be assigned common port numbers like 22, 80, or 443. Unusual high-numbered ports should be used to make them more difficult to detect using port scanners.

All communications are TLS 1.2 or TLS 1.3-encrypted, whereas in TLS v 1.2 only secure cypher suites are allowed. Backward compatibility with TLS v 1.1 and 1.0, as well as SSL and certificate downgrading, are not supported.

DoS & DDoS protection rate limit is imposed, and excessively inquisitive IPs are blacklisted.

Validator endpoints are set up to be resistant to all relevant OWASP vulnerabilities such as directory listing, directory traversal, source code disclosure, security misconfiguration, insecure deserialization of incoming data, etc.

Endpoint operating systems should have an uptime of at least 99% and the latest security patches with no default configurations.
No weak authentication mechanisms are allowed. 2FA must be implemented on all employee accounts that have access to the validators.
Incidents are logged and reported to the XP.network team and the entity controlling the corresponding validator.

Endpoint vulnerability scans are executed on a daily basis.

## Perimeter security
The physical security of a facility is often overlooked, and yet it’s a common attack vector. For example, even if a computer that contains crucial digital assets is kept unplugged from the internet, a nefarious agent can penetrate the room and infect the device with a virus stored on a USB drive. Alternatively, attackers can bribe an employee to steal or infect files, and so forth.

To prevent such physical penetration attacks, XP.network will create a so-called [zero-trust DMZ](https://www.oreilly.com/library/view/zero-trust-networks/9781491962183/ch01.html) (exclusion zone). Apart from fingerprint entry control, employees will be able to access only those data, equipment, and software that are required to do their job. The ‘exclusion zone’ will prevent employees from unintentionally or deliberately infecting the systems with spyware or exposing sensitive data. The zero-trust strategy makes phishing or social engineering attacks against random company employees less effective, if useful at all.

## Data Security and the human factor
XP.network will never request, store, or access any of the sensitive user data: mnemonics (seed phrase) and private keys. These will always be stored on user devices. The private key is needed for bridged blockchain wallets to sign user-initiated transactions, while mnemonics (usually a set of 12-14 words) is used to restore an account or attach it to a new wallet. Bridge transactions are signed directly from wallets, such as Metamask, ElrondWallet, etc and never by the bridge.

As noted above, it is the user’s responsibility to manage the private key (PK) in a secure manner – and this also applies to XP.network employees and everyone involved with the bridge infrastructure. In 95% of cyber breaches, a human error is involved, such as exposing a private key as a result of a phishing or a social engineering attack. Therefore, proper key management, including key back-ups and protection with other defence tools, is critical for controlling the human factor risks.

People involved in bridge interactions can be broadly divided in several categories, for each of which we’ve implemented different security protocols depending on the level of access and therefore potential impact on the system.

**Consciousness of behavior**|	**Insider**|	**Outsider**
|:---:|:---:|:---:|
Intended|	Infiltrated (BHH) <br/>Unsatisfied employee |	Black-hat hacker (BHH) <br/>Amateur (Script Kiddie)
By negligence|	Careless or tricked employee|	Careless or tricked blockchain user

Human Risk mitigation

||Insider|	Outsider|
|:---:|:---:|:---:|
Intended|	Zero-trust access control even in the DMZ, <br/>Access limited to necessity|	Firewalls, <br/>IP whitelists, <br/>unusually high <br/>port numbers
By negligence|	Corporate Security Policies <br/>Corporate Security Awareness|	User Security Policies<br/>User Security Awareness

https://thehackernews.com/2021/02/why-human-error-is-1-cyber-security.html

## A summary of vulnerabilities and mitigation solutions

Assets affected by the risk:|	Action causing|	Attack / Failure|	Mitigation
|:---:|:---:|:---:|:---:|
|Confidentiality breach||
People: users, team, validators|	Exposure of sensitive information, e.g. private key or seed phrase|	Phishing attack, social engineering, negligence	|Awareness (blogs, UI notifications) & training (docs)
Critical data|	a) mnemonics, <br/>b) private keys - compromised	|XSS, MIM attack	|I/O TLS encrypted, obligatory 2FA whenever possible, physical ledgers
|Integrity breach|
User Property (NFTs)|	a) duplicated <br/>b) stolen <br/>c) lost	|Smart contract or smart contract language vulnerability exploited	Audits by major security firms, pentests, bug bounty programs
Facilities|	NFT metadata storage unavailable|	Information deleted by the storage owner, hardware failure|	NFT metadata back-up or storage migration
|Availability breach|
Bridge services stopped|	a) validators are down <br/>b) blockchain nodes are down|	DoS, DDoS, OWASP attacks|	Incident recovery, continuous monitoring, firewalls & WAFs DDoS protection, 33% fault tolerance, node duplication + 1 in reserve, sharding
