pragma solidity ^0.4.23;

import "../Status.sol";

contract Phone {
    enum Call {
        Disconnected,
        Connected,
        Started,
        BusySignal,
        AnsweringMachine
    }

    string[] internal messages;
    mapping(address => bool) internal contacts;

    function toCode(Call _status) public pure returns (byte) {
        return Status.appCode(uint(_status));
    }

    function addContact(address _who) public returns (byte) {
        contacts[_who] = true;
        return byte(uint(Status.Reason.Success));
    }

    function outgoing(Phone _contact, string _message) public returns (byte, string) {
        byte code;
        string memory response;
        (code, response) = _contact.incoming(_message);
        return normalize(code, response);
    }

    function incoming(string _message) external returns (byte, string) {
        if (contacts[msg.sender]) {
            return (toCode(Call.Started), "Hi. Can I help you?");
        }

        messages.push(_message);
        return (toCode(Call.AnsweringMachine), "Your message has been recorded");
    }

    function normalize(byte _code, string _response) internal returns (byte, string) {
        if (_code == toCode(Call.Started)) { return (_code, _response); }
        if (_code == toCode(Call.BusySignal)) { return (_code, "BUSY TONE"); }
        if (Status.isOk(_code)) { return (toCode(Call.Connected), ""); }
        return (toCode(Call.Disconnected), "click");
    }
}
