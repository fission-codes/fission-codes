pragma solidity ^0.4.23;

import "../Status.sol";

contract AgeValidator {
    enum AgeStatus {
        TooYoung,
        Ok,
        TooOld
    }

    // Returns this contract's `AgeStatus`. While not strictly nesssary to delay
    // casting to `byte`, we do here fr donstration that it's fully legal.
    function checkAge(int _age) internal pure returns (AgeStatus) {
        if (_age > 150) { return AgeStatus.TooOld; }
        if (_age < 19) { return AgeStatus.TooYoung; }
        return AgeStatus.Ok;
    }

    // This is not an awesome mapper, but Solidity is limited
    function toCode(AgeStatus _ageStatus) internal pure returns (byte) {
        Status.Reason reason = Status.Reason.Success;

        if (_ageStatus == AgeStatus.TooOld) {
            reason = Status.Reason.Expired;
        } else if (_ageStatus == AgeStatus.TooYoung) {
            reason = Status.Reason.Before;
        }

        return Status.toCode(Status.Category.AppCategory, reason);
    }

    function check(int _age) public pure returns (byte) {
        return toCode(checkAge(_age));
    }
}
