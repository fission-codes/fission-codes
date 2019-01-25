pragma solidity ^0.5.0;

import { FISSION } from "../FISSION.sol";
import { SimpleAuth } from "./SimpleAuth.sol";

contract Portfolio {
    SimpleAuth private auth;
    mapping (address => bool) private holdings;

    constructor (SimpleAuth control) public {
        auth = control;
    }

    function isHeld(address token) external view returns (byte status, bool held) {
        byte permission = auth.min(SimpleAuth.Level.Unregistered);
        if (FISSION.isBlocking(permission)) { return (permission, false); }
        return (FISSION.code(FISSION.Status.Found_Equal_InRange), holdings[token]);
    }

    function setTracking(address token, bool track) external returns (byte status) {
        FISSION.requireSuccess(auth.min(SimpleAuth.Level.Member));
        holdings[token] = track;
        return FISSION.code(FISSION.Status.Success);
    }
}
