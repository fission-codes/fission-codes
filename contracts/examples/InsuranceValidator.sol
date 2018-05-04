pragma solidity ^0.4.23;

import "./AgeValidator.sol";
import "./FinancialValidator.sol";
import "../Status.sol";

contract InsuranceValidator {
    FinancialValidator financialValidator;
    AgeValidator ageValidator;

    constructor(address _financialValidator, address _ageValidator) public {
        financialValidator = FinancialValidator(_financialValidator);
        ageValidator = AgeValidator(_ageValidator);
    }

    function check(int _amount, int _age) public view returns (byte, address) {
        byte financialValidationResult = financialValidator.check(_amount);
        if (!Status.isOk(financialValidationResult)) {
            return (financialValidationResult, address(financialValidator));
        }

        byte ageValidationResult = ageValidator.check(_age);
        if (!Status.isOk(ageValidationResult)) {
            return (ageValidationResult, address(financialValidator));
        }

        return (Status.toCode(Status.Category.Generic, Status.Reason.Success), address(this));
    }

}
