pragma solidity ^0.6.0;

contract Level25Attack {
    uint256 public horsePower = 10;

    constructor() public {}

    function destruct() public {
        selfdestruct(payable(tx.origin));
    }
}
