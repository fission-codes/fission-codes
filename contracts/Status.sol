pragma solidity ^0.4.21;

import "./localization/LocalizationPrefs.sol";
import "./localization/StatusCodeLocalization.sol";

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
    require(isOk(_status), prefs.get[msg.sender].message(_status));
  }

  // Localization

  function localizeBy(byte _status, LocalizationPrefs _localizer) returns (string _msg){
    return _localizer.message(_status);
  }

  function localizeBy(byte _status, StatusCodeLocalization _prefs) returns (string _msg){
    return _localizeBy(_status, _prefs.get[msg.sender]);
  }
}
