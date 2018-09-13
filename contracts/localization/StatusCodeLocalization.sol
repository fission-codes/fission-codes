pragma solidity ^0.4.24;

contract StatusCodeLocalization {
  mapping(byte => string) private pMessages;

  /* event StatusCode(byte indexed code, string indexed message); */

  function add(byte _code, string _msg) internal {
    pMessages[_code] = _msg;
  }

  /* function log(byte _code) external { */
  /*   emit StatusCode(_code, pMessages[_code]); */
  /* } */

  function message(byte _code) external view returns (string _message) {
    return pMessages[_code];
  }
}
