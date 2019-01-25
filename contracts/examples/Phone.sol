pragma solidity ^0.5.0;

import { FISSION } from "../FISSION.sol";

contract Phone {
    enum Call {
      Disconnected, // Failure
      Connected,    // Success

      Voicemail,    // AwatingOthers
      Ringing,      // Accepted

      BusySignal,   // LowerLimit
      IncomingCall, // ActionRequested
      VoicemailFull // UpperLimit
    }

    string[] internal messages;
    mapping(address => bool) internal contacts;

    function addContact(address _who) public returns (byte status) {
        contacts[_who] = true;
        return byte(uint8(FISSION.Reason.Success));
    }

    function outgoing(Phone _contact, string memory _message) public returns (byte status, string memory) {
        (byte _status, string memory response) = _contact.incoming(_message);
        return normalize(_status, response);
    }

    function incoming(string calldata _message) external returns (byte status, string memory) {
        if (contacts[msg.sender]) {
            return (code(Call.Connected), "Hi. Can I help you?");
        }

        messages.push(_message);
        return (code(Call.Voicemail), "Your message has been recorded");
    }

    function normalize(byte _code, string memory _response) internal pure returns (byte status, string memory) {
        if (_code == code(Call.Connected)) { return (_code, _response); }
        if (_code == code(Call.BusySignal)) { return (_code, "BUSY TONE"); }
        if (FISSION.isOk(_code)) { return (code(Call.Connected), ""); }
        return (code(Call.Disconnected), "click");
    }

    function code(Call _status) private pure returns (byte status) {
      return FISSION.appCode(uint8(_status));
    }
}
