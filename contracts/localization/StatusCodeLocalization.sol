pragma solidity ^0.4.23;

contract StatusCodeLocalization {
    mapping(byte => string) public messages;

    event StatusCode(byte indexed code, string indexed message);

    function add(byte _code, string _msg) internal {
        messages[_code] = _msg;
    }

    function log(byte _code) external {
        emit StatusCode(_code, messages[_code]);
    }
}
