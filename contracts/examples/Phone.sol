pragma solidity ^0.5.0;

import "../Status.sol";

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

    function toCode(Call _status) public pure returns (bytes1) {
        return Status.appCode(uint8(_status));
    }

    function addContact(address _who) public returns (bytes1) {
        contacts[_who] = true;
        return bytes1(uint8(Status.Reason.Success));
    }

    function outgoing(Phone _contact, string memory _message) public returns (bytes1, string memory) {
        (bytes1 code, string memory response) = _contact.incoming(_message);
        return normalize(code, response);
    }

    function incoming(string calldata _message) external returns (bytes1, string memory) {
        if (contacts[msg.sender]) {
            return (toCode(Call.Connected), "Hi. Can I help you?");
        }

        messages.push(_message);
        return (toCode(Call.Voicemail), "Your message has been recorded");
    }

    function normalize(bytes1 _code, string memory _response) internal pure returns (bytes1, string memory) {
        if (_code == toCode(Call.Connected)) { return (_code, _response); }
        if (_code == toCode(Call.BusySignal)) { return (_code, "BUSY TONE"); }
        if (Status.isOk(_code)) { return (toCode(Call.Connected), ""); }
        return (toCode(Call.Disconnected), "click");
    }
}
