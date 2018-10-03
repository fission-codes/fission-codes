pragma solidity ^0.4.24;

import "/ethereum-localized-messaging/contracts/LocalizationPreferences.sol";
import "./localization/FissionLocalization.sol";

// works with `using Status for byte`

library Status {
    enum Category {
        Generic,
        Permission,
        Match,
        Offer,
        Availability,

        x50,
        x60,
        x70,
        x80,
        x90,

        AppCategory,

        xB0,
        xC0,
        xD0,

        Cryptography,
        OffChain
    }

    enum Reason {
        Failure,
        Success,
        Acceptance,
        Before,
        ActionRequired,

        Expired,
        x06,
        x07,
        x08,
        x09,

        AppReason,

        x0B,
        x0C,
        x0D,
        x0E,

        Info
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

    function localizeBy(byte _status, LocalizationPreferences _prefs) view public returns (bool found, string _msg) {
        return _prefs.get(_status);
    }

    // Check common statuses

    function isFailure(byte _status) public pure returns (bool) {
        return reasonOf(_status) == 0;
    }

    function isOk(byte _status) public pure returns (bool) {
        return reasonOf(_status) == 1;
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
}
