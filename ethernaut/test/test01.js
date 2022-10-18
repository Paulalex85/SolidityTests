const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Fallback", function () {
  it("Should be owner and empty contract", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const Fallback = await ethers.getContractFactory("Fallback");
    const fallback = await Fallback.deploy();
    await fallback.deployed();

    expect(await fallback.connect(owner).getContribution()).to.equal(ethers.utils.parseEther("1000.0"));

    await fallback.connect(addr1).contribute({ value: 100 });
    await addr1.sendTransaction({
      to: fallback.address,
      value: 100
    });

    expect(await fallback.owner()).to.equal(addr1.address);

    const balance = await ethers.provider.getBalance(fallback.address);
    console.log(balance.toString())

    await fallback.connect(addr1).withdraw();
    expect(await ethers.provider.getBalance(fallback.address)).to.equal(0);
  });
});
