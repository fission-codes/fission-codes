pragma solidity ^0.4.24;

import "/ethereum-localized-messaging/contracts/Localization.sol";

contract FissionLocalization is Localization {
    event FissionCode(bytes32 indexed code, string message);

    function log(bytes32 _code) public {
        emit FissionCode(_code, dictionary_[_code]);
    }
}
