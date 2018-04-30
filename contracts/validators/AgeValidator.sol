pragma solidity ^0.4.23;

import './../Status.sol';

contract AgeValidator {
    enum AgeStatus {
        Success,
        TooOld,
        TooYoung
    }

    function checkAge(int _age) internal pure returns (AgeStatus) {
        if (_age > 150) { return AgeStatus.TooOld; }
        if (_age < 19) { return AgeStatus.TooYoung; }
        return AgeStatus.Success;
    }

    // This is not an awesome mapper, but solidity is limited
    function toCode(AgeStatus _ageStatus) internal pure returns (byte) {
        Status.Reason reason = Status.Reason.Success;

        if (_ageStatus == AgeStatus.TooOld) {
            reason = Status.Reason.x05;
        } else if (_ageStatus == AgeStatus.TooYoung) {
            reason = Status.Reason.x06;
        }

        return Status.toCode(Status.Category.AppCategory, reason);
    }

    function check(int _age) public pure returns (byte) {
        return toCode(checkAge(_age));
    }

}
