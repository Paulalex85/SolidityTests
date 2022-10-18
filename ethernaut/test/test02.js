const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Fallout", function () {
  it("Should be owner", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const Fallout = await ethers.getContractFactory("Fallout");
    const fallout = await Fallout.deploy();
    await fallout.deployed();

    await fallout.connect(addr1).Fal1out();

    expect(await fallout.owner()).to.equal(addr1.address);
  });
});
