import { expect } from "chai";
import { ethers } from "hardhat";
import { NaughtCoin, NaughtCoin__factory } from "../typechain";

async function main() {
  const [addr1, addr2] = await ethers.getSigners();
  const deployedAddress = '0xaDa823cCdf7137D1dad0bB7bCCb416390a602f4b';
  const coinInstance: NaughtCoin = NaughtCoin__factory.connect(deployedAddress, addr1);

  let balanceToken = await coinInstance.balanceOf(addr1.address);
  await (await coinInstance.approve(addr2.address, balanceToken)).wait(1);
  await (await coinInstance.connect(addr2).transferFrom(addr1.address, addr2.address, balanceToken)).wait(1);

  expect((await coinInstance.balanceOf(addr1.address)).eq(0)).to.be.true;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
