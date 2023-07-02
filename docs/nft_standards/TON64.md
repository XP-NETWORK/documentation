---
sidebar_label: '10. TIP-64 - TON NFT'
sidebar_position: 10
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---

# TIP-64 - TON Metadata

This standard describes the requirements for metadata. Since in TON both NFTs and the collection are separate contracts, they both have JSON metadata.

## Collection metadata

The collection metadata partially resembles ERC-721 standard 

```json
{
   "image": "https://link.to.the.collection.image.png",
   "name": "Collection name",
   "description": "Collection description",
   "social_links": [
        "Twitter-link",
        "Telegram-link",
        "etc."
   ],
   "marketplace": "getgems.io"
}
```

## NFT metadata

NFT item metadata is almost identical to the one proposed by the [OpenSea](https://docs.opensea.io/docs/metadata-standards#metadata-structure) except `external_url` in OpenSea metadata is replaced with `content_url` in TIP-64. Besides, the present standard is missing such key-value pairs as <br/> `background_color`:`# a-6-character-hex`, <br/> `animation_url`:`link-to-a-video`, <br/> `youtube_url`:`link-to-youtube`.

```json
{
   "name": "NFT name",
   "description": "NFT description",
   "image": "https://link.to.the.item.image.png",
   "content_url": "https://link.to.the.item.image.png",
   "attributes": []
}
```

There's no particulars given how to form the attributes

<!-- https://github.com/ton-blockchain/TEPs/blob/master/text/0064-token-data-standard.md -->