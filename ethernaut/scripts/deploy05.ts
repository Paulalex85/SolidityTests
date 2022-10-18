import { network, ethers } from "hardhat";
import { Token__factory } from "../typechain/factories/Token__factory"
import { Token } from "../typechain";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

async function main() {
  const [addr1, addr2] = await ethers.getSigners();
  // const addr1.address = "0x229A2ECfCDa4b09cbD126d98aB7d4DAC2729b804";
  // await network.provider.request({
  //   method: "hardhat_addr1.address",
  //   params: [addr1.address],
  // });

  // const addr1: SignerWithAddress = await ethers.getSigner(addr1.address)

  const deployedAddress = '0x3D6AB13f62Bc9193ABdCe2e5bbdaA40ff181cDF5';
  const tokenInstance: Token = Token__factory.connect(deployedAddress, addr1);
  expect(await tokenInstance.balanceOf(addr1.address)).to.equal(20)

  await tokenInstance.connect(addr2).transfer(addr1.address, 1000);
  console.log((await tokenInstance.balanceOf(addr1.address)).toString())
  console.log((await tokenInstance.balanceOf(addr2.address)).toString())
  expect((await tokenInstance.balanceOf(addr1.address)).gt(20)).to.be.true;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
