import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import { CoinFlip } from "../typechain/CoinFlip"
import { ethers, network } from "hardhat";
import { expect } from "chai";
import { BigNumber, providers } from "ethers";

describe("CoinFlip", function () {
  it("Should win 10 times in a row", async function () {
    const [owner, addr1]: SignerWithAddress[] = await ethers.getSigners();
    const ContractFactory = await ethers.getContractFactory("CoinFlip");
    const contract: CoinFlip = await ContractFactory.deploy();
    await contract.deployed();

    const FACTOR: BigNumber = BigNumber.from("57896044618658097711785492504343953926634992332820282019728792003956564819968");
    let nWin = 0;
    while (nWin < 10) {
      await network.provider.send("evm_mine");

      const blockNumber: number = await ethers.provider.getBlockNumber();
      const block: providers.Block = await ethers.provider.getBlock(blockNumber);
      const currentHash: BigNumber = BigNumber.from(block.hash);
      const flip = currentHash.div(FACTOR)
      await contract.connect(addr1).flip(flip.gte(1));
      nWin++;
      expect(await contract.consecutiveWins()).to.equal(nWin);
      console.log("Nb wins : " + nWin);
    }
    expect(10).to.equal(nWin);
  });
});
