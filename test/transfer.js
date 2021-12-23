const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HuskyToken", function () {
  it("Should Transfer and take fee", async function () {
    const HuskyToken = await ethers.getContractFactory("HuskyToken");
    const [owner, A2, A3] = await ethers.getSigners();
    const huskyToken = await HuskyToken.deploy(1000, 100, A3.address, 2000);
    await huskyToken.deployed();
    await huskyToken.transfer(A2.address, 100);
    expect(await huskyToken.balanceOf(A3.address)).to.be.equal(10);
    expect(await huskyToken.balanceOf(A2.address)).to.be.equal(90);
    expect(await huskyToken.balanceOf(owner.address)).to.be.equal(900);
  });
  it("Should Cap the amount of new tokens that can be minted", async function () {
    const HuskyToken = await ethers.getContractFactory("HuskyToken");
    const [owner, A2, A3] = await ethers.getSigners();
    const huskyToken = await HuskyToken.deploy(1000, 100, A3.address, 2000);
    await huskyToken.deployed();
    await huskyToken.mint(500);
    const total = await huskyToken.totalSupply();
    expect(total).to.be.equal(1500);
    await expect(huskyToken.mint(1000)).to.be.revertedWith(
      "Exceeds maximum supply"
    );
  });
});
