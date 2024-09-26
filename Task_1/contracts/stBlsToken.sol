// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./BlsToken.sol";

contract stBLS is ERC20 {
    BlumeLiquidStaking public blsToken;

    constructor(address _blsTokenAddress) ERC20("StakedBlumeLiquidStakingToken", "stBLS") {
        blsToken = BlumeLiquidStaking(_blsTokenAddress);
    }

    function stake(address _account, uint256 amount) public {
        // Transfer BLS tokens to this contract
        blsToken.transferFrom(_account, address(this), amount);

        // Mint stBLS tokens to the staker
        _mint(_account, amount);
    }

    function unstake(address _account,uint256 amount) public {
        // Burn stBLS tokens
        _burn(_account, amount);

        // Transfer BLS tokens back to the staker
        blsToken.transfer(_account, amount);
    }
}