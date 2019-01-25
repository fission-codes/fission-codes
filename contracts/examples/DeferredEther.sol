pragma solidity ^0.5.0;

import { FISSION } from "../FISSION.sol";

contract DeferredEther {
    struct Deferred {
        uint256 weiAmount;
        uint256 releaseAt;
    }

    /* mapping(address => Deferred) public heldFunds; */

    /* constructor () {} */

    /* function deferWei(uint256 weiAmount) payable public returns (byte status) { */
    /*   // TODO */
    /* } */

    /* function release(address who) nonpayable public returns (byte status) { */
    /*     // TODO */
    /*   // check time */
    /*   return doTransfer(who); */
    /* } */

    /* function forceRelease(address who) public returns (byte status) { */
    /*     FISSION.requireSuccess(Auth.minAuth(who, Auth.Authority.Admin), "Not an admin"); */
    /*     return doTransfer(who); */
    /* } */

    /* function info() external returns (byte state, string memory info) { */
    /*   // TODO */
    /* } */

    /* function doTransfer(address who) private returns (byte status) { */
    /*     if (heldFunds[who].weiAmount == 0) { */
    /*       return FISSION.code(FISSION.Status.Generic_Duplicate_Unnessesary_Inapplicable); */
    /*     } */

    /*     who.transfer(heldFunds[who].weiAmount); */
    /*     heldFunds[who] = 0; */
    /*     return FISSION.code(FISSION.Status.TransferSuccessful); */
    /* } */
}
