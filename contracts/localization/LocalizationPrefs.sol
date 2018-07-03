pragma solidity ^0.4.23;

contract LocalizationPrefs {
  mapping(address => address) private _localization;

  address public defaultLocalization;

  constructor(address _defaultLocalization) public {
    defaultLocalization = _defaultLocalization;
  }

  function set(address _contract) public returns (byte _status) {
    _localization[msg.sender] = _contract;
  }

  function get(address _who) view public returns (byte _status, address _contract) {
    // Is 0x0 the default?
    if (_localization[_who] == 0x0) {
      return defaultLocalization;
    } else {
      return _localization[_who];
    }
  }

  function get(byte _code) view public returns (byte _status, string _message) {
    return get(msg.sender, _code);
  }

  function get(address _who, byte _code) public returns (byte _status, string _message) {
    return get(_who).messages(_code);
  }
}
