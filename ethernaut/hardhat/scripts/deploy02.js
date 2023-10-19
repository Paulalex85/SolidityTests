const hre = require("hardhat");

async function main() {
  const [addr1] = await ethers.getSigners();
  const deployedAddress = '0x872b9b2DfB60c0F1e4B2a6633E18092267777856';
  const Fallout = await hre.ethers.getContractFactory("Fallout");
  const fallout = await Fallout.attach(deployedAddress);

  await fallout.connect(addr1).Fal1out();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
