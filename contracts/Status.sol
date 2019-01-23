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

    function toCode(Category _category, Reason _reason) public pure returns (bytes1 code) {
        return toCode(uint8(_category), uint8(_reason));
    }

    function toCode(uint8 _category, uint8 _reason) public pure returns (bytes1 code) {
      return bytes1(uint8((_category << 4) + _reason));
    }

    function appCode(uint8 _appReason) public pure returns (byte code) {
        return bytes1(uint8(160 + _appReason));
    }

    // Get nibbles

    function categoryOf(bytes1 _status) public pure returns (uint8 category) {
        return (uint8(_status >> 4));
    }

    function reasonOf(bytes1 _status) public pure returns (uint8 reason) {
        return uint8(_status & hex"0F");
    }

    // Localization

    function localizeBy(bytes1 _status, LocalizationPreferences _prefs) view public returns (bool found, string memory _msg) {
        return _prefs.textFor(_status);
    }

    // Check common statuses

    function isOk(bytes1 _status) public pure returns (bool) {
      return (uint8(_status) % 2) == 1;
    }

    function isBlocking(bytes1 _status) public pure returns (bool) {
        return !isOk(_status);
    }

    function isSuccess(bytes1 _status) public pure returns (bool) {
        return reasonOf(_status) == 1;
    }

    function isFailure(bytes1 _status) public pure returns (bool) {
        return reasonOf(_status) == 0;
    }

    // `require`s

    function requireOk(bytes1 _status) public pure {
        require(isOk(_status));
    }

    function requireOk(bytes1 _status, string memory message) public pure {
        require(isOk(_status), message);
    }

    function requireOk(bytes1 _status, LocalizationPreferences _prefs) public view {
        (bool _, string memory message) = localizeBy(_status, _prefs);
        requireOk(_status, message);
    }

    function requireSuccess(bytes1 _status) public pure {
        require(isSuccess(_status));
    }

    function requireSuccess(bytes1 _status, string memory message) public pure {
        require(isSuccess(_status), message);
    }

    function requireSuccess(bytes1 _status, LocalizationPreferences _prefs) public view {
        (bool _, string memory message) = localizeBy(_status, _prefs);
        requireSuccess(_status, message);
    }
}
