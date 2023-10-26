---
sidebar_label: '14. CEP-78 Casper NFT standard'
sidebar_position: 14
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---

# CEP-78 Casper NFT standard

<center>

<img src="/img/standards/casper.png" alt="" width="80px"/>

</center>


## Modalities

In the context of the [CEP-78 Enhanced NFT Standard](https://github.com/casper-ecosystem/cep-78-enhanced-nft), [modalities](https://github.com/XP-NETWORK/casper-nft/blob/production/contract/src/modalities.rs) refer to various behavioral options and configurations that can be applied to a specific instance of a smart contract. These modalities help determine how the contract functions and interacts with the blockchain network. Here's a brief explanation of some of the key modalities:

1. **Ownership** defines the behavior regarding ownership of NFTs. It specifies whether the owner of an NFT can change over the contract's lifetime. It offers three modes: Minter, Assigned, and Transferable. In Minter mode, the owner cannot change, while in Assigned and Transferable modes, the owner can be specified by the minter and transferred to other entities.

2. **NFTKind** specifies the type of commodity that NFTs minted by the contract represent. It has three variations: Physical, Digital, and Virtual, each representing different types of NFTs.

3. **NFTHolderMode** dictates which entities on the blockchain can own and mint NFTs. It provides options for allowing only Accounts, only Contracts, or a mix of both to own and mint NFTs.

4. **WhitelistMode** determines if the ACL whitelist that restricts access to the mint entry point can be updated. It offers two options: Unlocked (whitelist can be updated) and Locked (whitelist cannot be updated).

5. **Minting** modality governs how new NFT tokens are minted. It can be set to Installer (only the contract installer can mint), Public (any account can mint), or ACL (only whitelisted accounts or contracts can mint).

6. **AllowMinting** dictates whether any entity can mint NFTs. It can be set to allow or disallow minting.

7. **ACLPackageMode** governs the ability to whitelist a package for minting instead of a versioned contract. It can be set to true or false.

8. **PackageOperatorMode** governs the ability to approve a package for transfer. It can be set to true or false.

9. **NFTMetadataKind** dictates the schema for the metadata associated with NFTs. Options include CEP78, NFT721, Raw, and CustomValidated. CustomValidated allows custom schemas.

10. **NFTIdentifierMode** determines the primary identifier for NFTs minted by the contract. It can be set to Ordinal or Hash. The Hash mode generates an identifier based on the metadata hash, making it content-addressed and immutable.

11. **Metadata Mutability** defines whether the metadata for NFTs can be updated after minting. Options include Immutable (metadata cannot be updated) and Mutable (metadata can be updated).

12. **BurnMode** decides whether tokens minted by the contract can be burnt. It can be set to Burnable or NonBurnable.

13. **OperatorBurnMode** determines if an operator (account or contract) can burn tokens. It can be set to true or false.

14. **OwnerReverseLookupMode** governs whether data for reverse lookup by the owner is maintained. Options include NoLookup, Complete, and TransfersOnly.

15. **NamedKeyConventionMode** dictates whether the contract instance should install a new version (DerivedFromCollectionName) or upgrade from version 1.0 (V_1_0_standard or V_1_0_custom).

16. **EventsMode** determines how the contract records and handles events. Options include NoEvents, CEP47, and CES (Casper Event Standard).

These modalities provide flexibility and configuration options for CEP-78 contract instances to align with specific use cases and requirements, making them highly adaptable to different NFT scenarios.

## Deployment parameters
The NFT contract installation requires a set of runtime arguments to determine its behavior. 

### These arguments include:

**collection_name**: The name of the NFT collection as a string (required).

**collection_symbol**: The symbol representing the collection as a string (required).

**total_token_supply**: The total number of NFTs the contract will mint as a U64 value (required).

**ownership_mode**: Dictates ownership behavior (required).

**nft_kind**: Specifies the type of off-chain items the NFT data represents (required).

**json_schema**: The JSON schema for minted NFT tokens (required for custom validation).

**nft_metadata_kind**: The base metadata schema for the NFTs (required).

**identifier_mode**: Determines the primary identifier for minted NFTs (required).

**metadata_mutability**: Specifies whether NFT metadata can be updated (required).

### Optional parameters:

**minting_mode**: Dictates access to the minting entry point (optional).

**allow_minting**: A flag to pause minting (optional).

**whitelist_mode**: Dictates whether the contract whitelist can be updated (optional).

**holder_mode**: Specifies which entities can hold NFTs (optional).

**acl_whitelist**: A list of accounts/contracts allowed to mint NFTs (optional).

**burn_mode**: Dictates whether minted NFTs can be burnt (optional).

**owner_reverse_lookup_mode**: Enables owner-to-token identifier lookup (optional).

**events_mode**: Selects the event schema for recording changes (optional).

**additional_required_metadata**: Additional required metadata schema (optional).

**optional_metadata**: Additional optional metadata schema (optional).

These arguments configure the NFT contract's behavior and properties during installation. Some are required, while others are optional, allowing for customization and flexibility.

## Metadata

The following CEP-78 standard functions collectively handle the definition and validation of custom [metadata schemas](https://github.com/XP-NETWORK/casper-nft/blob/production/contract/src/metadata.rs). They are used to ensure that the token metadata adheres to the specified schema for different NFT metadata kinds.

`MetadataSchemaProperty`: This structure represents a metadata schema's properties. It defines the name, description, and whether the property is required.

`CustomMetadataSchema`: This structure collects properties in a custom metadata schema using a BTreeMap.

`get_metadata_schema(kind)`: This function returns a custom metadata schema based on the provided NFTMetadataKind. It creates specific schema properties for various metadata types.

`validate_metadata(metadata_kind, token_metadata)`: This function validates the format and contents of the token metadata based on the provided NFTMetadataKind. It ensures the required properties are present and returns a formatted JSON string.

`get_metadata_dictionary_name(metadata_kind)`: This function generates and returns a dictionary name based on the provided NFTMetadataKind.
