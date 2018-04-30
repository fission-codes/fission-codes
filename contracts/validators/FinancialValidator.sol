pragma solidity ^0.4.23;

import './../Status.sol';

contract FinancialValidator {
    function checkBalance(int _amount) internal pure returns (Status.Reason) {
        if (_amount < 1000) { return Status.Reason.x05; }
        return Status.Reason.Success;
    }

    function check(int _amount) public pure returns (byte) {
        return Status.toCode(Status.Category.Permission, checkBalance(_amount));
    }

}
