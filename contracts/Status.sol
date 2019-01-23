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

    function toCode(Category _category, Reason _reason) public pure returns (byte code) {
        return toCode(uint(_category), uint(_reason));
    }

    function toCode(uint _category, uint _reason) public pure returns (byte code) {
        return byte((_category << 4) + _reason);
    }

    function appCode(uint _appReason) public pure returns (byte code) {
        return byte(160 + _appReason);
    }

    // Get nibbles

    function categoryOf(byte _status) public pure returns (uint category) {
        return uint(_status >> 4);
    }

    function reasonOf(byte _status) public pure returns (uint reason) {
        return uint(_status & hex"0F");
    }

    // Localization

    function localizeBy(byte _status, LocalizationPreferences _prefs) view public returns (bool found, string memory _msg) {
        return _prefs.textFor(_status);
    }

    // Check common statuses

    function isOk(byte _status) public pure returns (bool) {
        return mod(_status, 2) == 0;
    }

    function isBlocking(byte _status) public pure returns (bool) {
        return !isOk(_status);
    }

    function isSuccess(byte _status) public pure returns (bool) {
        return reasonOf(_status) == 1;
    }

    function isFailure(byte _status) public pure returns (bool) {
        return reasonOf(_status) == 0;
    }

    // `require`s

    function requireOk(byte _status) public pure {
        require(isOk(_status));
    }

    function requireOk(byte _status, string message) public pure {
        require(isOk(_status), message);
    }

    function requireOk(byte _status, LocalizationPreferences _prefs) public view {
        (bool _, string memory message) = localizeBy(_status, _prefs);
        requireOk(_status, message);
    }

    function requireSuccess(byte _status) public pure {
        require(isSuccess(_status));
    }

    function requireSuccess(byte _status, string message) public pure {
        require(isSuccess(_status), message);
    }

    function requireSuccess(byte _status, LocalizationPreferences _prefs) public view {
        (bool _, string memory message) = localizeBy(_status, _prefs);
        requireSuccess(_status, message);
    }
}
