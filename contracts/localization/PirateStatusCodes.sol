pragma solidity ^0.4.24;

import "./StatusCodeLocalization.sol";

contract PirateStatusCodes is StatusCodeLocalization {
  constructor() public {
    add(hex"00", "Nay!");
    add(hex"01", "Aye!");
    add(hex"02", "Arr jolly crew have begun");
    add(hex"03", "Awaitin'");
    add(hex"04", "Ye need ta do something");
    add(hex"05", "Has walked thar plank an expired");

    add(hex"0F", "Only this here metadata");

    add(hex"10", "Ye can nay do that");
    add(hex"11", "Ye be permitted");
    add(hex"12", "Ye have requested thar go ahead");
    add(hex"13", "Yer waitin' fer the go ahead");
    add(hex"14", "Thar awaiting yer signal");
    add(hex"15", "No Longer Allowed");

    add(hex"20", "Nay plunder found");
    add(hex"21", "Plunder found");
    add(hex"22", "Yer match request be sent");
    add(hex"23", "Ye need t' wait fer yer match");
    add(hex"24", "Thar jolly crew got yer message");
    add(hex"25", "That be outta range");

    add(hex"30", "No deal, matey");
    add(hex"31", "The other crew has agreed to yer terms");
    add(hex"32", "Yer offer has been sent");
    add(hex"33", "Yer awaitin' thar agreement");
    add(hex"34", "Thar awaitin' yer agreement");
    add(hex"35", "Offer nay longer on the table");

    add(hex"40", "Nay ready yet");
    add(hex"41", "'tis ready, matey");
    add(hex"42", "Ye may start");
    add(hex"43", "Nay yet ready");
    add(hex"44", "We be awaitin' yer signal");
    add(hex"45", "Nay available anymore");

    add(hex"E0", "Yer message can nay be unscrambled");
    add(hex"E1", "Yer message be unscrambled");
    add(hex"E2", "Yer payload be signed");
    add(hex"E3", "Ye need a signin' from thar other crew");
    add(hex"E4", "Yer signature be needed");
    add(hex"E5", "That there token be nay jolly good no more");

    add(hex"F0", "Off chain excursion be a failure");
    add(hex"F1", "Off chain excursion be a success");
    add(hex"F2", "Yer process has begun off chain");
    add(hex"F3", "Awaitin' fer completion off chain");
    add(hex"F4", "Yer action be needed off chain");
    add(hex"F5", "Off chain service be not around");

    add(hex"FF", "Data source be off chain (ie: nay guaranteed)");
  }
}
