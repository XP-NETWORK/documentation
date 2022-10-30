# ESDT token creation

## 0. Initial project setup

Run the following commands in your terminal one after another:

```bash
git clone https://github.com/XP-NETWORK/esdt-deployer.git
cd esdt-deployer/
yarn
mv .env.example .env
```

## 1. ESDT token creation

1.1 Populate the keys of the `.env` file with values

```bash
# 1. Set Issue params & run yarn issue-esdt
# A-z-a-z 3-20 chars:
ISSUE_NAME=
# Upper case 3-10 A-Z chars only
ISSUE_TICKER=
# Select from: FT | NFT | SFT
ISSUE_TYPE="NFT"
```
1.2 Run the following command in the terminal:
```bash
yarn issue-esdt
```

## 2. Setting roles
In order to mint and burn assets, roles must be granted to the accounts:

2.1 Populate the keys of the `.env` file with values

```bash
# 2. Set Roles & run yarn set-roles
ROLES_TICKER=
# ESDT Type - Select from: FT | NFT | SFT
ROLES_TYPE="NFT"
# Roles recipient
# Devnet: erd1qqqqqqqqqqqqqpgqy2nx5z4cpr90de4sga2v2yx62fph3lg8g6vskt0k2f
# Mainnet: erd1qqqqqqqqqqqqqpgq3y98dyjdp72lwzvd35yt4f9ua2a3n70v0drsfycvu8
# Your address can be retrieved from the wallet or your pem file
ROLES_ADDRESS=
```
2.2 Run the following command in the terminal:
```bash
yarn set-roles
```

## 3. Minting FTs, NFT, SFTs

3.1 Populate the keys of the `.env` file with values

```bash
# 3. Set Minting Params & run yarn mint
MINT_TICKER="Collection-12345"
# 1 for NFT, 1..MAX_INT for FTs/SFTs
MINT_SUPPLY=1
MINT_NAME="NFT Name"
MINT_ROYALTIES=0
MINT_ATTRIBUTES="https://your.url.here"
# Comma-separated string of values, no spaces
MINT_URI="https://your.url.here"
```
3.2 Run the following command in the terminal:
```bash
yarn mint
```