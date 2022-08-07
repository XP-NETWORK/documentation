---
sidebar_label: '16. Royalties'
sidebar_position: 16
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---

# Royalties

![1](/img/royalties/1.png)

The etymology of the word dates back to ancient times. Initially, there was no concept of private property. Natural resources did not belong to anyone. 

![2](/img/royalties/2.png)

However, once people discovered agriculture and started investing time and effort in the cultivated land, they started feeling it was theirs. Not all the people were producing. 

![3](/img/royalties/3.png)

Some became professional warriors and used their power to conquer other people's land. But the warriors still needed peasants to cultivate the land, so they leased it to the peasants and received a fee.

![4](/img/royalties/4.png)

Great warriors gathered big armies, conquered lands of their less successful counterparts, and became kings. This is where the word Royalty started shaping. 

![5](/img/royalties/5.png)

In Latin, the adjective `regalis` meant "kingly" or "belonging to a king." The word was borrowed into English via French spoken by nobility around 1400 AD.

![6](/img/royalties/6.png)

Gradually a system evolved where Kings gave lands to their immediate supporters, who became large landlords. The landlords spread the lands among their vassals, who comprised their private armies. The vassals leased the land to the peasants, who paid for using the land. 

Royalties came backward. The commoners paid the barons, and Barrons paid the dukes who brought the money to the King.

In the modern world, royalties apply to intangible items such as patents, Trademarks & Copyrights, and tangible ones, including Land, Property Tax, Mineral rights, and Art Resale royalty which became the prototype for the NFT royalties in the blockchain era.

![7](/img/royalties/7.png)

NFTs with royalties can be broadly divided into the following groups: Art, Music or photos minted as NFTs, Sport and Trading cards, Collectible NFTs, Domain Names that can be used as logins or as DNS addresses, Game Utilities such as swords, shields, armor, spaceships, and locations in Metaverses. Creators of the NFT collections can set their contracts to notify the interested parties about the secondary sales and the percentage the sellers owe to the asset creators.

![8](/img/royalties/8.png)

The first standard responsible for royalties is ERC-2981. It is implemented by OpenZeppelin and can be added to the contracts as an extension. The contract storage is represented by a private variable `_defaultRoyaltyInfo` used for holding the address of the global beneficiary. If royalties are set individually for every NFT, there's a mapping called `_tokenRoyaltyInfo .` In any case, the information is stored in a RoyaltyInfo structure.

![9](/img/royalties/9.png)

The default beneficiary can be set with an internal function called `_setDefaultRoyalty.`  The function takes two parameters: the beneficiary address and the Royalty percentage. The internal function must be wrapped with a public or external function calling it. It has two sanity checks. It verifies that the royalties are equal to or less than 100% and that the beneficiary is not addressed zero. Then the private variable `_defaultRoyaltyInfo` is set with the RoyaltyInfo type struct.

![10](/img/royalties/10.png)

Individual token royalties are set in a similar way. There's an additional parameter - the `tokenId` used for accessing the token record in the mapping. If the same two sanity checks pass, the record for the selected NFT is updated with the new beneficiary and the fraction awarded as royalties.

![11](/img/royalties/11.png)

An important internal function of the contract is the `_feeDenominator.` Since Solidity does not support floating point numbers, percentage precision to point oh one is achieved by setting 100% to 10,000. When setting the royalty percentage, multiply your number by 100. For example, 10% must be set as 1000, or 7.5% should be passed as 750.

![12](/img/royalties/12.png)

To access the royalty information, the `royaltyInfo` function must be called with the `tokenId` and the `salePrice` as arguments. 

![13](/img/royalties/13.png)

ERC-2981 only signals royalties. If a marketplace contract does not call the functions providing the royalty information - The creators' rights will not be observed. It checks if the NFT has individual settings. Depending on the outcome of the check, it either returns the default or the individual token royalty settings.

It is important to mention that a new royalty standard has been under development since March 14, 2022. [EIP-4910](https://github.com/ethereum/EIPs/pull/4910) has not been accepted at the moment of shooting, so it exists as a proposal and may change in the nearest future. 

![17](/img/royalties/17.png)

Surprisingly, only one out of the top six marketplaces supports Royalty extensions. 
1. Rarible supports both ERC-2981 and EIP-4910. 
2. OpenSea allows the collection owner to set royalties to one or multiple beneficiaries in the UI of the marketplace. 
3. Nifty Gateway, Foundation & Enjin have fixed 10% royalties. 
4. While SuperRare sets 15% for the first sale and 10% for the rest.

![15](/img/royalties/15.png)

This is a fragment of the OpenSea UI where royalties can be set. We can click the `Add address` button if we want to add multiple addresses.

![18](/img/royalties/18.png)

XP. Network bridge does not bridge NFTs or SFT tokens. We keep the logic of the contracts, including the royalties on the destination chain. To find out how to watch the video about smart contract mapping.

![16](/img/royalties/16.png)

