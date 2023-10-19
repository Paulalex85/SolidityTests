// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {Script, console2} from "forge-std/Script.sol";
import {IEthernaut} from "../interfaces/IEthernaut.sol";
//import {Shop} from "../src/Level26.sol";

contract Level21 is Script {
    IEthernaut _ethernaut = IEthernaut(vm.envAddress("ETHERNAUT_ADDR"));
    address _caller = vm.addr(vm.envUint("PRIVATE_KEY"));

    function run() public {
//        Shop _instance = Shop(payable(vm.envAddress("LVL26_ADDR")));
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

//        uint256 price = _instance.price();
//
//        Attack _attack = new Attack();
//        _attack.atatatak(_instance);
//
//        if (_instance.isSold() && _instance.price() < price) {
//            _ethernaut.submitLevelInstance(address(_instance));
//        } else console2.log("Not solved");
    }
}

// forge script script/Level21.s.sol --broadcast --rpc-url sepolia -vvvv
