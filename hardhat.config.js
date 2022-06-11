require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.11",
  networks: {
    // mumbai: {
    //   url: 'https://polygon-mumbai.g.alchemy.com/v2/fMj-55wq7QB8B2OE0-GgL65sZj3hk18L',
    //   accounts: [`0x${process.env.PRIVATE_KEY}`],
    // },
		// polygon: {
		// 	url: 'https://polygon-mainnet.g.alchemy.com/v2/K5Ci2EHKtfQum2PWgYGntSJEcq60-IFW',
		// 	accounts: [`0x${process.env.PRIVATE_KEY}`]
		// }
  },
};
