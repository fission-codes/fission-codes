pragma solidity ^0.5.0;

import { FISSION } from "../FISSION.sol";

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
    function code(AgeStatus _ageStatus) internal pure returns (byte status) {
        FISSION.Reason reason = FISSION.Reason.Success;

        if (_ageStatus == AgeStatus.TooOld) {
            reason = FISSION.Reason.UpperLimit;
        } else if (_ageStatus == AgeStatus.TooYoung) {
            reason = FISSION.Reason.LowerLimit;
        }

        return FISSION.code(FISSION.Category.ApplicationSpecific, reason);
    }

    function check(int _age) public pure returns (byte status) {
        return code(checkAge(_age));
    }
}
