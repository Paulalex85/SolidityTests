import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import { SimpleToken, SimpleToken__factory } from "../typechain";

async function main() {
  const [addr1] = await ethers.getSigners();
  const provider = waffle.provider;
  const deployedAddress = '0x0ab199fa0D9BB28ffFE711CD67E21471bCcE3c7e';
  const tokenInstance: SimpleToken = SimpleToken__factory.connect(deployedAddress, addr1);

  let balanceBefore = await provider.getBalance(addr1.address);
  await (await tokenInstance.destroy(addr1.address)).wait(1);
  expect((await provider.getBalance(addr1.address)).sub(balanceBefore)).to.be.at.least(ethers.utils.parseEther("0.49"));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
