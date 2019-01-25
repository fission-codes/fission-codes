pragma solidity ^0.5.0;

import { AgeValidator } from "./AgeValidator.sol";
import { FinancialValidator } from "./FinancialValidator.sol";
import { FISSION } from "../FISSION.sol";

contract InsuranceValidator {
    FinancialValidator private financialValidator;
    AgeValidator private ageValidator;

    constructor(address _financialValidator, address _ageValidator) public {
        financialValidator = FinancialValidator(_financialValidator);
        ageValidator = AgeValidator(_ageValidator);
    }

    function check(int amount, int age) public view returns (byte status, address) {
        byte financialValidationResult = financialValidator.check(amount);
        if (FISSION.isBlocking(financialValidationResult)) {
            return (financialValidationResult, address(financialValidator));
        }

        byte ageValidationResult = ageValidator.check(age);
        if (FISSION.isBlocking(ageValidationResult)) {
            return (ageValidationResult, address(financialValidator));
        }

        return (FISSION.code(FISSION.Status.GenericSuccess), address(this));
    }
}
