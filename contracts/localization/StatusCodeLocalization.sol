pragma solidity ^0.4.24;

contract StatusCodeLocalization {
  mapping(byte => string) private messages_;

  function add(byte _code, string _msg) internal {
    messages_[_code] = _msg;
  }

  function message(byte _code) external view returns (string _message) {
    return messages_[_code];
  }
}
