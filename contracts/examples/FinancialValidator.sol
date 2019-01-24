pragma solidity ^0.5.0;

import "../Status.sol";

contract FinancialValidator {
    function checkBalance(int _amount) internal pure returns (Status.Reason) {
        if (_amount < 1000) { return Status.Reason.Failure; }
        return Status.Reason.Success;
    }

    function check(int _amount) public pure returns (byte) {
        return Status.toCode(Status.Category.Permission, checkBalance(_amount));
    }

}
