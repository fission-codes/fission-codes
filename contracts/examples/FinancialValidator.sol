pragma solidity ^0.5.8;

import { FISSION } from "../FISSION.sol";

contract FinancialValidator {
    function check(int _amount) public pure returns (byte status) {
        return FISSION.code(FISSION.Category.Permission, checkBalance(_amount));
    }

    function checkBalance(int _amount) internal pure returns (FISSION.Reason) {
        if (_amount < 1000) { return FISSION.Reason.Failure; }
        return FISSION.Reason.Success;
    }
}
