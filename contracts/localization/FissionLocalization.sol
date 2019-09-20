pragma solidity ^0.5.8;

import { Localization } from "/ethereum-localized-messaging/contracts/Localization.sol";

contract FissionLocalization is Localization {
    event FissionCode(bytes32 indexed code, string message);

    function log(bytes32 code) public {
        emit FissionCode(code, dictionary[code]);
    }
}
