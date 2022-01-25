---
sidebar_label: "Minting NFTs"
sidebar_position: 9
---

# Minting NFTs

Call the mint function on the factory with suitable arguments.

  ## 1. Minting on Web3 Chains

  ```javascript
  (async () => {
    // Web3Provider generally refers to a walletProvider like Metamask.
    const receipt = await factory.mint(
      avax,   // The chain where to mint
      signer, // The browser injected signer
      {
          // Could be an IPFS URL or Any URL that points to a Metadata
          uris: [metadata.url],
          // Description of your NFT. Can be an object.
          attrs: description,
          // A name that defines your NFT.
          name: name,
          // The contract with which you want to mint the NFT.
          contract: "Can be fetched from the mainnetConfig or testnetConfig",
      }
    );
  })();
  ```

  ## 2. Minting on Elrond:<br/>

  ```javascript
  (async () => {
     const receipt = await factory.mint(
       elrond,        // The chain where to mint
       elrondSigner,  // The browser injected signer
       {
          // Could be an IPFS URL or Any URL that points to a Metadata
          uris: [metadata.url],
          // Description of your NFT. Can be an object.
          attrs: description,
          // A name that defines your NFT.
          name: name,
          // The identifier with which you want to mint the NFT. You have to own this identifier. i.e.
          identifier: "XPNFT-eda5d0-c5",
     });
  })();
  ```

  ## 3.  Minting on Tron:

  ```javascript
  const receipt = await factory.mint(avax, tronSigner, {
    // Could be an IPFS URL or Any URL that points to a Metadata
    uris: [metadata.url],
    // Description of your NFT. Can be an object.
    attrs: description,
    // A name that defines your NFT.
    name: name,
    // The contract with which you want to mint the NFT.
    contract: "Can be fetched from the mainnetConfig or testnetConfig",
  });
  ```