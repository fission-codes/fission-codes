pragma solidity ^0.4.23;

import "./StatusCodeLocalization.sol";

contract LocalizationPrefs {
  mapping(address => StatusCodeLocalization) private _localization;

  StatusCodeLocalization public defaultLocalization;

  constructor(StatusCodeLocalization _defaultLocalization) public {
    defaultLocalization = _defaultLocalization;
  }

  function set(StatusCodeLocalization _contract) public returns (byte _status) {
    _localization[msg.sender] = _contract;
    return hex"01";
  }

  function get(address _who) view public returns (byte _status, StatusCodeLocalization _localizer) {
    // Is 0x0 the default?
    if (_localization[_who] == StatusCodeLocalization(0x0)) { // MAY NOT WORK?
      return (hex"00", defaultLocalization);
    } else {
      return (hex"01", _localization[_who]);
    }
  }

  function get(byte _code) view public returns (byte _status, string _message) {
    return get(msg.sender, _code);
  }

  function get(address _who, byte _code) public returns (byte _status, string _message) {
    (byte status, StatusCodeLocalization localizer) = get(_who);
    return (status, localizer.message(_code));
  }
}
