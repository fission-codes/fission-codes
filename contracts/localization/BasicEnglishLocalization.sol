pragma solidity ^0.5.8;

import { FissionLocalization } from "./FissionLocalization.sol";

contract BasicEnglishLocalization is FissionLocalization {
    constructor() public {
        set(hex"00", "Failure");
        set(hex"01", "Success");
        set(hex"02", "Accepted/Started");
        set(hex"03", "Awaiting/Before");
        set(hex"04", "Action Required");
        set(hex"05", "Expired");

        set(hex"0F", "Metadata Only");

        set(hex"10", "Disallowed");
        set(hex"11", "Allowed");
        set(hex"12", "Requested Permission");
        set(hex"13", "Awaiting Permission");
        set(hex"14", "Awaiting Your Permission");
        set(hex"15", "No Longer Allowed");

        set(hex"20", "Not Found");
        set(hex"21", "Found");
        set(hex"22", "Match Request Sent");
        set(hex"23", "Awaiting Match");
        set(hex"24", "Match Request Received");
        set(hex"25", "Out of Range");

        set(hex"30", "Other Party Disagreed");
        set(hex"31", "Other Party Agreed");
        set(hex"32", "Sent Offer");
        set(hex"33", "Awaiting Their Ratification");
        set(hex"34", "Awaiting Your Ratification");
        set(hex"35", "Offer Expired");

        set(hex"40", "Unavailable");
        set(hex"41", "Available");
        set(hex"42", "You May Begin");
        set(hex"43", "Not Yet Available");
        set(hex"44", "Awaiting Your Availability/Signal");
        set(hex"45", "No Longer Available");

        set(hex"E0", "Decrypt Failure");
        set(hex"E1", "Decrypt Success");
        set(hex"E2", "Signed");
        set(hex"E3", "Oter Party Signature Required");
        set(hex"E4", "Your Signature Expired");
        set(hex"E5", "Token Expired");

        set(hex"F0", "Off Chain Failure");
        set(hex"F1", "Off Chain Success");
        set(hex"F2", "Off Chain Process Started");
        set(hex"F3", "Awaiting Off Chain Completion");
        set(hex"F4", "Off Chain Action Required");
        set(hex"F5", "Off Chain Service Not Available");

        set(hex"FF", "Data Source is Off Chain (ie: no guarantees)");
    }
}
