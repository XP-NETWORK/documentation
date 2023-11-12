---
sidebar_label: 'Anatomy of # 1 NFT Collection'
sidebar_position: 7
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---

import ReactPlayer from 'react-player'

# Anatomy of # 1 NFT Collection

## Code

The BoredApeYachtClub contract, implemented in Solidity, extends the ERC721 Non-Fungible Token Standard and incorporates the Ownable contract. It manages a collection of Bored Apes with a specified maximum supply, allowing users to mint these unique tokens at a fixed price per token. Overall, the contract is designed to facilitate the minting and management of Bored Apes within a specified ecosystem.

| Contract Property       | Description                                                                                      |
|-------------------------|--------------------------------------------------------------------------------------------------|
| `BAYC_PROVENANCE`        | String variable storing the provenance of the Bored Apes.                                          |
| `startingIndexBlock`     | Unsigned integer storing the block number at which the starting index is set.                      |
| `startingIndex`          | Unsigned integer representing the starting index for the collection.                                |
| `apePrice`               | Constant representing the price in Wei to mint a single Bored Ape (0.08 ETH).                       |
| `maxApePurchase`         | Constant representing the maximum number of Apes that can be purchased in a single transaction (20).|
| `MAX_APES`               | Unsigned integer representing the maximum supply of Bored Apes.                                      |
| `saleIsActive`           | Boolean flag indicating whether the sale is active or not.                                          |
| `REVEAL_TIMESTAMP`       | Unsigned integer representing the timestamp at which the reveal of the Bored Apes occurs.            |

Additionally, mechanisms are in place to calculate and set the starting index for the collection, ensuring fair distribution. The contract employs constants, such as the maximum tokens purchasable in one transaction and the sale price, and features a structured constructor to initialize essential parameters. 

| Constructor Parameter    | Description                                                                                      |
|--------------------------|--------------------------------------------------------------------------------------------------|
| `name`                   | Name of the contract (BoredApeYachtClub).                                                        |
| `symbol`                 | Symbol of the contract (BAYC).                                                                   |
| `maxNftSupply`           | Maximum supply of NFTs for the contract (10,000).                                                |
| `saleStart`              | Start timestamp for the sale (1619060439, i.e. Thursday, April 22, 2021 3:00:39 AM GMT).         |

The contract includes functionality for the contract owner to reserve a portion of the supply, set the reveal timestamp, and manage the provenance hash. The sale can be paused or resumed, and the contract owner can withdraw the contract's balance.

| Function                | Description                                                                                        |
|-------------------------|----------------------------------------------------------------------------------------------------|
| `withdraw`              | Allows the contract owner to withdraw the contract's balance.                                       |
| `reserveApes`           | Allows the contract owner to reserve 30 Bored Apes.                                                 |
| `setRevealTimestamp`    | Allows the contract owner to set the reveal timestamp.                                               |
| `setProvenanceHash`     | Allows the contract owner to set the provenance hash.                                               |
| `setBaseURI`            | Allows the contract owner to set the base URI for metadata.                                          |
| `flipSaleState`         | Allows the contract owner to toggle the sale state (active or paused).                               |
| `mintApe`               | Allows users to mint Bored Apes by specifying the number of tokens and sending the correct Ether.   |
| `setStartingIndex`      | Sets the starting index for the collection based on the blockhash.                                   |
| `emergencySetStartingIndexBlock` | Allows the contract owner to set the starting index block in case of an emergency.               |


## Metadata

The collection metadata is stored on IPFS: https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/ {token-id}, for example: https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/0.

1. Attributes (traits)

The traits are categorized into different categories such as "Background," "Clothes," "Earring," "Eyes," "Fur," "Hat," and "Mouth." Each trait category has a specified number of variations.

Certainly! Here is the information about the collection traits presented in a Markdown table:

| Trait Category | Number of Variations |
|----------------|-----------------------|
| Background     | 8                     |
| Clothes        | 43                    |
| Earring        | 6                     |
| Eyes           | 23                    |
| Fur            | 19                    |
| Hat            | 36                    |
| Mouth          | 33                    |

This table summarizes the different trait categories and the corresponding number of variations for each category in the collection.

These variations represent the different visual attributes or features associated with the items in the collection, allowing for a diverse range of appearances within the specified traits.

2. Artwork

The Images are also stored on IPFS, for example: https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ.

The Bored Ape Yacht Club (BAYC) has gained significant attention in the world of digital art and NFTs (Non-Fungible Tokens). The project features a collection of unique, hand-drawn, and distinctively styled cartoon apes, each with its own set of traits, accessories, and backgrounds. Here's an artistic critical review of the Bored Ape Yacht Club's artwork.

The project showcases a **high level of creativity** in designing a diverse set of ape characters. Each ape is unique, with a combination of traits, colors, and accessories that make them stand out. The **level of detail** in each ape is commendable. From facial expressions to clothing and background elements, the artists have paid attention to the smallest details, contributing to the overall richness of the artwork.

Despite the **diversity in traits**, there is a sense of **cohesiveness and consistency** across the collection. The art style remains consistent, creating a visually unified and recognizable set of characters.

While the project has seen widespread success, some may argue that the hype surrounding it has led to inflated prices and exclusivity concerns. Additionally, the commercialization of digital art through NFTs has sparked debates about accessibility and environmental impact.

In summary, the Bored Ape Yacht Club's artwork is a testament to the potential of digital art in the age of blockchain and NFTs. Its success lies not only in the visual appeal of the apes but also in the innovative integration of technology, community building, and cultural impact. However, like any art movement, it is not without its challenges and criticisms.


## Success Drivers

As discussed in the video below, the major success drivers were:

1. Real world-related utility of high demand: status-related events promoted and attended by celebs.
2. Aggressive marketing campaign involving world celebrity promotion.
3. Authentic primitivistic but eye-catching artwork spreads from PNG images to fandom merchandise and animated cartoons.

<ReactPlayer className="introduction-player" controls url='https://www.youtube.com/watch?v=2rnkbSbUF2k=0s' />