import { ethers } from "hardhat";
import { Vault__factory } from "../typechain/factories/Vault__factory";
import { Vault } from "../typechain/Vault";

async function main() {
  const [addr1] = await ethers.getSigners();
  const deployedAddress = '0xE3e06089c6988123E6985cab3b903038d9E2B9E2';
  const vaultInstance: Vault = Vault__factory.connect(deployedAddress, addr1);

  await vaultInstance.unlock(ethers.utils.hexlify("0x412076657279207374726f6e67207365637265742070617373776f7264203a29"));

  console.log(await vaultInstance.locked())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
