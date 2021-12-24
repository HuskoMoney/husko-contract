// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const BigNumber = require('bignumber.js');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
	const decimals = 18;
	const supply = new BigNumber(396000000 * (10**decimals)).toFixed();
	const fee = 50;
	const feeTaker = '0xAd4B1774f0C051AaEce4402370f1b340809fF64B';
	const maxSupply = new BigNumber(1000000000 * (10**decimals)).toFixed();
	console.log(supply, maxSupply);
  const HuskoToken = await hre.ethers.getContractFactory("HuskoToken");
  const huskoToken = await HuskoToken.deploy(supply, fee, feeTaker, maxSupply);

  await huskoToken.deployed();

  console.log("Husko Token deployed to:", huskoToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
