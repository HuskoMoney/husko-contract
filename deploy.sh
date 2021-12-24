#!/bin/bash

## deploy
npx hardhat compile

# testnet
npx hardhat run ./scripts/deploy.js --network mumbai

# mainnet
npx hardhat run ./scripts/deploy.js --network polygon
