pragma solidity ^0.4.23;

import "./StatusCodeLocalization.sol";

contract BasicEnglishStatusCodes is StatusCodeLocalization {
  constructor() public {
    add(hex"00", "Failure");
    add(hex"01", "Success");
    add(hex"02", "Accepted/Started");
    add(hex"03", "Awaiting/Before");
    add(hex"04", "Action Required");
    add(hex"05", "Expired");

    add(hex"0F", "Metadata Only");

    add(hex"10", "Disallowed");
    add(hex"11", "Allowed");
    add(hex"12", "Requested Permission");
    add(hex"13", "Awaiting Permission");
    add(hex"14", "Awaiting Your Permission");
    add(hex"15", "No Longer Allowed");

    add(hex"20", "Not Found");
    add(hex"21", "Found");
    add(hex"22", "Match Request Sent");
    add(hex"23", "Awaiting Match");
    add(hex"24", "Match Request Received");
    add(hex"25", "Out of Range");

    add(hex"30", "Other Party Disagreed");
    add(hex"31", "Other Party Agreed");
    add(hex"32", "Sent Offer");
    add(hex"33", "Awaiting Their Ratification");
    add(hex"34", "Awaiting Your Ratification");
    add(hex"35", "Offer Expired");

    add(hex"40", "Unavailable");
    add(hex"41", "Available");
    add(hex"42", "You May Begin");
    add(hex"43", "Not Yet Available");
    add(hex"44", "Awaiting Your Availability/Signal");
    add(hex"45", "No Longer Available");

    add(hex"E0", "Decrypt Failure");
    add(hex"E1", "Decrypt Success");
    add(hex"E2", "Signed");
    add(hex"E3", "Oter Party Signature Required");
    add(hex"E4", "Your Signature Expired");
    add(hex"E5", "Token Expired");

    add(hex"F0", "Off Chain Failure");
    add(hex"F1", "Off Chain Success");
    add(hex"F2", "Off Chain Process Started");
    add(hex"F3", "Awaiting Off Chain Completion");
    add(hex"F4", "Off Chain Action Required");
    add(hex"F5", "Off Chain Service Not Available");

    add(hex"FF", "Data Source is Off Chain (ie: no guarantees)");
  }
}
