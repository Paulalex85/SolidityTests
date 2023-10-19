// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "hardhat/console.sol";

contract DelegateBis {
    address public owner;

    constructor(address _owner) public {
        owner = _owner;
    }

    function pwn() public {
        console.log("hello in pwn %s", msg.sender);
        owner = msg.sender;
        console.log("owner in pwn %s", owner);
    }
}

contract DelegationBis {
    address public owner;
    DelegateBis delegate;

    constructor(address _delegateAddress) public {
        delegate = DelegateBis(_delegateAddress);
        owner = msg.sender;
    }

    fallback() external {
        console.log("call fallback");
        (bool result, ) = address(delegate).delegatecall(msg.data);
        console.log("result %s", result);
        console.log("owner %s", owner);
        if (result) {
            this;
        }
    }
}
