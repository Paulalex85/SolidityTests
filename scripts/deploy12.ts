import { ethers } from "hardhat";
import { Privacy, Privacy__factory } from "../typechain";

async function main() {
  const [addr1] = await ethers.getSigners();
  const deployedAddress = '0xaD2871C988A4df4B15bF609E259410AF81C02E5c';
  const privacyInstance: Privacy = Privacy__factory.connect(deployedAddress, addr1);

  let tx = await privacyInstance.unlock(ethers.utils.hexlify("0xc9a96ea2983c278d51511de134a1bb8a"));
  await tx.wait(1);
  console.log(await privacyInstance.locked())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
