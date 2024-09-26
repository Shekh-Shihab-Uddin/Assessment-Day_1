// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BlsToken.sol";
import "./stBlsToken.sol";

contract StakingPool {
    BlumeLiquidStaking public blsToken;
    stBLS public stBLSToken;

    constructor(address _blsTokenAddress, address _stBLSTokenAddress) {
        blsToken = BlumeLiquidStaking(_blsTokenAddress);
        stBLSToken = stBLS(_stBLSTokenAddress);
    }

    function stake(uint256 amount) public {
        // Ensure BLS token is approved for transfer
        require(blsToken.allowance(msg.sender, address(this)) >= amount, "Insufficient allowance");
        // Mint stBLS tokens to the staker
        stBLSToken.stake(msg.sender, amount);
    }

    function unstake(uint256 amount) public {
        // Ensure sufficient stBLS balance
        require(stBLSToken.balanceOf(msg.sender) >= amount, "Insufficient stBLS balance");
        // Burn stBLS tokens
        stBLSToken.unstake(msg.sender, amount);
    }
}