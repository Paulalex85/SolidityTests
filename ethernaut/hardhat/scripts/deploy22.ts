import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { Dex, Dex__factory } from "../typechain";

async function main() {
  const [addr1] = await ethers.getSigners();
  // await network.provider.request({
  //   method: "hardhat_impersonateAccount",
  //   params: ["0x229A2ECfCDa4b09cbD126d98aB7d4DAC2729b804"],
  // });
  // const addr1 = await ethers.getSigner("0x229A2ECfCDa4b09cbD126d98aB7d4DAC2729b804")

  const amountValues = [10, 20, 24, 30, 41, 45]
  const deployedAddress = '0xfe1DA4E5b807A97a04f675Ba72ED1b63F4d79E79';
  const instance: Dex = Dex__factory.connect(deployedAddress, addr1);

  const tokenA: string = await instance.token1();
  const tokenB: string = await instance.token2();
  for (let i = 0; i < amountValues.length; i++) {
    const userBalanceTokenA: BigNumber = await instance.balanceOf(tokenA, addr1.address)
    const userBalanceTokenB: BigNumber = await instance.balanceOf(tokenB, addr1.address)
    const contractBalanceTokenA: BigNumber = await instance.balanceOf(tokenA, deployedAddress)
    const contractBalanceTokenB: BigNumber = await instance.balanceOf(tokenB, deployedAddress)
    console.log("**********************")
    console.log("Balance user token A : " + userBalanceTokenA)
    console.log("Balance user token B : " + userBalanceTokenB)
    console.log("Balance contract token A : " + contractBalanceTokenA)
    console.log("Balance contract token B : " + contractBalanceTokenB)
    await (await instance.approve(deployedAddress, amountValues[i])).wait(1)
    if (userBalanceTokenA.gte(userBalanceTokenB)) {
      await (await instance.swap(tokenA, tokenB, amountValues[i])).wait(1)
    } else {
      await (await instance.swap(tokenB, tokenA, amountValues[i])).wait(1)
    }
  }

  expect(await instance.balanceOf(tokenA, deployedAddress)).to.be.eq(0)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
