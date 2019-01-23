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
        return uint8(status & hex"0F");
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
