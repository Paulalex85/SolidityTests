import { expect } from "chai";
import { ethers } from "hardhat";
import { GatekeeperTwo, GatekeeperTwo__factory, GateTwoAttack, GateTwoAttack__factory } from "../typechain";

async function main() {
  const [addr1] = await ethers.getSigners();
  const deployedAddress = '0xAe8071BE5f63576391E2Dd0431891e93511c7706';
  const gateInstance: GatekeeperTwo = GatekeeperTwo__factory.connect(deployedAddress, addr1);

  const attackInstance: GateTwoAttack = await new GateTwoAttack__factory(addr1).deploy(gateInstance.address, { gasLimit: 2000000 });
  await attackInstance.deployed();
  console.log("deployed : " + attackInstance.address)

  expect(await gateInstance.entrant()).to.be.equal(addr1.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
