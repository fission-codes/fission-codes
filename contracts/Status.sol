pragma solidity ^0.4.21;

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
        AwaitingOthers,
        ActionRequired,

        x05,
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

    function toByte(Category _category, Reason _reason) private pure returns (byte code) {
        return byte((uint(_category) << 4) + uint(_reason));
    }

    // Get nibbles

    function categoryOf(byte _status) private pure returns (byte category) {
        return _status >> 4;
    }

    function reasonOf(byte _status) private pure returns (byte reason) {
        return _status & hex"0F";
    }

    // Check common statuses

    function isFailure(byte _status) private pure returns (bool) {
        return reasonOf(_status) == 0;
    }

    function isOk(byte _status) private pure returns (bool) {
        return reasonOf(_status) == 1;
    }

    // `require`s

    function requireOk(byte _status) private pure {
        require(isOk(_status));
    }

    function requireOk(byte _status, string message) private pure {
        require(isOk(_status), message);
    }
}
