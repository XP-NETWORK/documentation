---
sidebar_label: '8. Off-Chain Multisignature'
sidebar_position: 8
---

# Off-Chain Multisignature

## TL;DR
The off-chain multi-signature collection has reduced the transaction costs and made the number of validators scalable.

## Definition
***Digital Signature (DS)*** is a function implementing an *asymmetric cryptography* algorithm that securely links a signer's secret key (SK) with the message. The authenticity of a signature can be verified using the public key (PK).

## Why is it secure?
By contrast with symmetric cryptography, where the same key is employed for encryption and decryption, asymmetric cryptography utilizes two keys: public (PK) and private (SK). While in symmetric cryptography, there's a fundamental problem of secure transportation of the secret key in asymmetric cryptography, the issue is solved. The PK is cryptographically derivable from the private key (SK), but the secret key cannot be back-engineered from the public key. It allows to freely distribute the PK and use it to verify the authenticity of the message signed with the secret key without exposing the SK to the public.

## Schnorr Signature
[Claus-Peter Schnorr](https://en.wikipedia.org/wiki/Claus_P._Schnorr) (born 1943-08-4), a German mathematician & cryptographer, suggested in 1989, filed in 1990, and finally patented in 1991 [^1] a digital signature algorithm using elliptic curve cryptography but enjoying several advantages over ECDSA in terms of computational efficiency and thus speed privacy and storage requirements. The patent expired in 2008 

## What makes Schnorr efficient?
The most significant advantage of Schnorr is key aggregation. By contrast with the regular multisig $(m-of-n)$ address where $Msig_{n} = (PK_0..PK_{m-1},M, Sig_0...Sig_{m-1})$:
- $Msig_{n}$ - multisignature of size $n$
- $PK_0$ - The first public key
- $PK_{m-1}$ - The last public key out of $m$ required for success
- $M$ - the signed message
- $Sig_0$ - The first signature
- $Sig_{m-1}$ - The last signature  out of $m$ required for success

the Schnorr scheme allows to aggregate the spacious $PKs$ and $Sigs$ to single objects, thus saving on storage and computation. Hence, Schnorr multi-signature has an $n$ times more efficient form: $Msig_{n} = (PK,M, Sig)$.


## Mathematical Representation of Schnorr Signature

The Schnorr Digital Signature scheme can be represented as a 3 component tuple of algorithms, where $DS = (Kg, Sign, Vfy)$<br/>

***$Kg$*** or key generation can be represented as $Kg = sk => pk$, where public key $pk$ is generated from the secret key $sk$<br/>
***$Sign$***$(sk,m)$ generates a signature $\sigma$ on message $m\epsilon\{0,1\}^*$<br/>
***$Vfy$*** $(pk, m, \sigma)$ outputs 1 in case the signature $\sigma$ is valid for the message $m$ and 0 otherwise.


## Algorithm Parameters

|Parameter|Description|Secrecy|
|:-:|:-:|:-:|
|$p$| A prime number|Public|
|$q$| factor of $p-1$|Public|
|$a$| $a^q = 1 mod \|p\|$|Public|
|$M$| The message, where $M \epsilon \{0,1\}*$| Public|
|$v$| $a^{-s} mod \|q\|$|Public Key|
|$r$| A random number $0 < r < q$| Secret |
|$s$| $0 < s < q$| Secret|


## Step 1. Signing a message

1. Choose a random $r$, where $0 < r < q$
2. Compute $x = a^r mod |p|$
3. Concatenate $e = h(M || x)$
4. Compute $y = (r + se) mod |q|$

## Step 2. Sending the message

Message: $M$<br/>
Signature $(e, y)$<br/>

## Step 3. Receiving the signed message

1. Received: $M, (e,y)$
2. Public: $a, p, q, v$

## Step 4. Reading the message

The receiver has to compute: $x' = a^y  v^e mod |p|$<br/>

The math behind it:<br/>
$x' = a^y v^e = a^ya^se = a^{y-se} = a^r x mod |p|$<br/>
### Outcome:
$\begin{pmatrix}y = r + se\\r = y - se\end{pmatrix}$<br/>

### Step 5. Signature Verification:
$r_v = g^sy^e$<br/>
$e_v = H(M || x)$<br/>
If $e_v$ computed above matches with the one $e$ received, the signature was valid.

## Footnotes

[^1]: [Patent US4995082A Method for identifying subscribers and for generating and verifying electronic signatures in a data exchange system](https://patents.google.com/patent/US4995082)