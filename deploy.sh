#!/bin/bash

## deploy
npx hardhat compile

# testnet
npx hardhat run ./scripts/deploy.js --network mumbai

# mainnet
#npx hardhat run ./scripts/deploy.js --network polygon

# update json for tipme.cash

#cp ./artifacts/contracts/TipMe.sol/TipMe.json ~/www/tipme.cash/app/static
