pragma solidity ^0.5.0;

import { FISSION } from "../FISSION.sol";

contract Auth {
    enum Level {
        Banned,
        Unregistered,
        Member,
        Admin
    }

    mapping(address => Level) public auth;

    constructor() public {
        auth[tx.origin] = Level.Admin;
    }

    // Anyone

    function minAuth(address who, Level minLevel) public view returns (byte status) {
      if (auth[who] == Level.Banned) { return FISSION.code(FISSION.Status.Revoked_Banned); }
      if (auth[who] < minLevel) { return FISSION.code(FISSION.Status.Disallowed_Stop); }
      return FISSION.code(FISSION.Status.Allowed_Go);
    }

    // Member

    function induct(address who) external onlyMembers returns (byte status) {
        require(
            (auth[who] != Level.Banned || auth[tx.origin] == Level.Admin),
            "Only admins can re-induct a banned member"
        );

        auth[who] = Level.Member;
        return FISSION.code(FISSION.Status.Success);
    }

    // Admin

    function promote(address who) external onlyAdmins returns (byte status) {
        auth[who] = Level.Admin;
        return FISSION.code(FISSION.Status.Success);
    }

    function ban(address who) external onlyAdmins returns (byte status) {
        auth[who] = Level.Banned;
        return FISSION.code(FISSION.Status.Success);
    }

    // Modifiers

    modifier onlyMembers {
        require(auth[tx.origin] >= Level.Member, "Must be a member");
        _;
    }

    modifier onlyAdmins {
        require(auth[tx.origin] == Level.Admin, "Must be an admin");
        _;
    }
}
