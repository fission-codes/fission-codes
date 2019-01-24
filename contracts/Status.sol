pragma solidity ^0.5.0;

import "/ethereum-localized-messaging/contracts/LocalizationPreferences.sol";
import "./localization/FissionLocalization.sol";

library Status {
    enum Category {
        Generic,
        Permission,
        Find,
        Negotiation,
        Availability,
        Finance,

        x60,
        x70,
        x80,
        x90,

        ApplicationSpecific,

        xB0,
        xC0,
        xD0,

        Cryptography,
        OffChain
    }

    enum Reason {
        Failure,
        Success,

        AwaitingOthers,
        Accepted,
        LowerLimit,
        ActionRequested,
        UpperLimit,

        x06,
        x07,

        Inapplicable,

        x09,
        x0A,
        x0B,
        x0C,
        x0D,
        x0E,

        Informational
    }

    enum Code {
               GenericFailure,
               GenericSuccess,
               GenericAwatingOthers,
               GenericAccepted,
               GenericLowerLimit,
               GenericRecieverActionRequested,
               GenericUpperLimit,
               RESERVEDx07,
               Generic_Duplicate_Unnessesary_Inapplicable,
               RESERVEDx09,
               RESERVEDx0A,
               RESERVEDx0B,
               RESERVEDx0C,
               RESERVEDx0D,
               RESERVEDx0E,
               GenericInformational,

               Disallowed_Stop,
               Allowed_Go,
               AwaitingOthersPermission,
               PermissionRequested,
               TooOpen_Insecure,
               NeedsYourPermission_RequestForContinuation,
               Revoked_Banned,
               RESERVEDx17,
               NotApplicatableToCurrentState,
               RESERVEDx19,
               RESERVEDx1A,
               RESERVEDx1B,
               RESERVEDx1C,
               RESERVEDx1D,
               RESERVEDx1E,
               PermissionDetails_ControlConditions,

               NotFound_Unequal_OutOfRange,
               FoundOrAEqualOrInRange,
               AwaitingMatch,
               MatchRequestSent,
               BelowRange_Underflow,
               RequestForMatch,
               Above_Range_Overflow,
               RESERVEDx27,
               Duplicate_Conflict_Collision,
               RESERVEDx29,
               RESERVEDx2A,
               RESERVEDx2B,
               RESERVEDx2C,
               RESERVEDx2D,
               RESERVEDx2E,
               MatchingInformation,

               SenderDisagrees_Nay,
               SenderAgrees_Yea,
               AwaitingRatification,
               OfferSent_Voted,
               QuorumNotReached,
               ReceiversRatificationRequested,
               OfferOrVoteLimitReached,
               RESERVEDx37,
               AlreadyVoted,
               RESERVEDx39,
               RESERVEDx3A,
               RESERVEDx3B,
               RESERVEDx3C,
               RESERVEDx3D,
               RESERVEDx3E,
               NegotiationRules_ParticipationInformation
    }

    function toCode(bytes1 category, bytes1 reason) public pure returns (bytes1 code) {
        return (category << 4) | (bytes1(0x0F) & reason);
    }

    function toCode(uint8 category, uint8 reason) public pure returns (bytes1 code) {
        return bytes1(uint8((category << 4) + reason));
    }

    function toCode(Category category, Reason reason) public pure returns (bytes1 code) {
        return toCode(uint8(category), uint8(reason));
    }

    function appCode(uint8 appReason) public pure returns (byte code) {
        return bytes1(uint8(160 + appReason));
    }

    // Get nibbles

    function categoryOf(bytes1 status) public pure returns (uint8 category) {
        return (uint8(status >> 4));
    }

    function reasonOf(bytes1 status) public pure returns (uint8 reason) {
        return uint8(status & 0x0F);
    }

    // Localization

    function localizeBy(bytes1 status, LocalizationPreferences prefs) view public returns (bool found, string memory _msg) {
        return prefs.textFor(status);
    }

    // Check common statuses

    function isOk(bytes1 status) public pure returns (bool) {
      return (uint8(status) % 2) == 1;
    }

    function isBlocking(bytes1 status) public pure returns (bool) {
        return !isOk(status);
    }

    function isSuccess(bytes1 status) public pure returns (bool) {
        return reasonOf(status) == 1;
    }

    function isFailure(bytes1 status) public pure returns (bool) {
        return reasonOf(status) == 0;
    }

    // `require`s

    function requireOk(bytes1 status) public pure {
        require(isOk(status));
    }

    function requireOk(bytes1 status, string memory message) public pure {
        require(isOk(status), message);
    }

    function requireOk(bytes1 status, LocalizationPreferences prefs) public view {
        (bool _, string memory message) = localizeBy(status, prefs);
        requireOk(status, message);
    }

    function requireSuccess(bytes1 status) public pure {
        require(isSuccess(status));
    }

    function requireSuccess(bytes1 status, string memory message) public pure {
        require(isSuccess(status), message);
    }

    function requireSuccess(bytes1 status, LocalizationPreferences prefs) public view {
        (bool _, string memory message) = localizeBy(status, prefs);
        requireSuccess(status, message);
    }
}
