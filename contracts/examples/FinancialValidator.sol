pragma solidity ^0.5.0;

import { FISSION } from "../FISSION.sol";

contract FinancialValidator {
    function checkBalance(int _amount) internal pure returns (FISSION.Reason) {
        if (_amount < 1000) { return FISSION.Reason.Failure; }
        return FISSION.Reason.Success;
    }

    function check(int _amount) public pure returns (byte) {
        return FISSION.code(FISSION.Category.Permission, checkBalance(_amount));
    }

}
