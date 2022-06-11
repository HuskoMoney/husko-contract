// scripts/upgrade_fruits.js
const { ethers, upgrades } = require('hardhat');

async function main () {
  const HuskoTokenV2 = await ethers.getContractFactory('HuskoTokenV2');
  console.log('Upgrading HuskoToken...');
  await upgrades.upgradeProxy('0x0B306BF915C4d645ff596e518fAf3F9669b97016', HuskoTokenV2);
  console.log('HuskoToken upgraded');
}

main();