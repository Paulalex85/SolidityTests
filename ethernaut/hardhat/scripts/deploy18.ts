import { expect } from "chai";
import { BigNumber, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import { MagicNum, MagicNum__factory } from "../typechain";

async function main() {
  const [addr1] = await ethers.getSigners();
  const deployedAddress = '0x4BD36f268190496882D75510254e9660D1d10178';
  const magicInstance: MagicNum = MagicNum__factory.connect(deployedAddress, addr1);

  const abi = [
    "function whatIsTheMeaningOfLife() pure returns (uint)"
  ];

  const abiFactory = [
    "constructor()"
];

  const bytecode = "600a80600b6000396000f3602a60005260206000f3"
  const evmFactory = new ContractFactory(abiFactory, bytecode, addr1)
  const solverContract = await evmFactory.deploy();
  await solverContract.deployTransaction.wait(1);

  const solv = new ethers.Contract(solverContract.address, abi, addr1);
  await (await magicInstance.setSolver(solverContract.address)).wait(1);
  let result = await solv.whatIsTheMeaningOfLife();
  console.log(result)
  expect(result).to.be.equal(BigNumber.from(42));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
