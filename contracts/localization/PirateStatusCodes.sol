pragma solidity ^0.4.23;

import "./StatusCodeLocalization.sol";

contract PirateStatusCodes is StatusCodeLocalization {
  constructor() public {
    add(hex"00", "Nay!"); //
    add(hex"01", "Aye!"); //
    add(hex"02", "Arr jolly crew have begun");
    add(hex"03", "Waitin' or afore");
    add(hex"04", "Ye need t' d' something");
    add(hex"05", "Has walked thar plank!");

    add(hex"0F", "Only this here metadata");

    add(hex"10", "Ye may nay d' that");
    add(hex"11", "Ye be permitted");
    add(hex"12", "Requested Permission");
    add(hex"13", "Awaiting Permission");
    add(hex"14", "Awaiting Your Permission");
    add(hex"15", "No Longer Allowed");

    add(hex"20", "Nay plunder found"); //
    add(hex"21", "Plunder found");
    add(hex"22", "Match Request Sent");
    add(hex"23", "Ye need t' wait fer yer match");
    add(hex"24", "Thar jolly crew got yer message");
    add(hex"25", "That be outta range");

    add(hex"30", "No deal, matey");
    add(hex"31", "Other Party Agreed");
    add(hex"32", "Sent Offer");
    add(hex"33", "Awaiting Their Ratification");
    add(hex"34", "Awaiting Your Ratification");
    add(hex"35", "Offer Expired");

    add(hex"40", "Nay ready yet");
    add(hex"41", "Ready matey");
    add(hex"42", "Ye may start");
    add(hex"43", "Nay yet ready");
    add(hex"44", "We's waiting fer yer signal");
    add(hex"45", "Nay available anymore");

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

    add(hex"FF", "data source be off chain (ie: nay guaranteed)");
  }
}
