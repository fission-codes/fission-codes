pragma solidity ^0.5.0;

import { FISSION } from "../FISSION.sol";

contract Auth {
    enum Authority {
        Banned,
        Unregistered,
        Member,
        Admin
    }

    mapping(address => Authority) public auth;

    constructor() public {
        auth[msg.sender] = Authority.Admin;
    }

    function ban(address who) external returns (byte status) {
        auth[who] = Authority.Banned;
        return FISSION.code(FISSION.Status.GenericSuccess);
    }

    function induct(address who) external returns (byte status) {
        FISSION.requireSuccess(minAuth(who, Authority.Member));
        auth[who] = Authority.Member;
        return FISSION.code(FISSION.Status.GenericSuccess);
    }

    function promote(address who) external returns (byte status) {
        if (FISSION.isSuccess(minAuth(who, Authority.Admin))) {
          return FISSION.code(FISSION.Status.Revoked_Banned);
        }

        auth[who] = Authority.Admin;
        return FISSION.code(FISSION.Status.GenericSuccess);
    }

    function minAuth(address who, Authority minLevel) public view returns (byte status) {
        if (auth[who] == Authority.Banned) { return FISSION.code(FISSION.Status.Revoked_Banned); }
        if (auth[who] < minLevel) { return FISSION.code(FISSION.Status.Disallowed_Stop); }
        return FISSION.code(FISSION.Status.Allowed_Go);
    }
}
