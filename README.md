# Ethereum Status Codes
Broadly applpicable status codes for Ethereum smart contracts

## Hex / `byte1` Table Encoding

| X. Low Nibble                     | 0. Generic              | 10. Permission                | 20. Find/Match/&c       | 30. Negotiation / Offers         | 40. Availability               | 50. | 60. | 70. | 80. | 90. | A0. | B0. | C0. | D0. | E0. Cryptography                    | F0. Off Chain                                     |
|-----------------------------------|-------------------------|-------------------------------|-------------------------|----------------------------------|--------------------------------|-----|-----|-----|-----|-----|-----|-----|-----|-----|-------------------------------------|---------------------------------------------------|
| 0. Failure                        | 0x00 Failure            | 0x10 Disallowed               | 0x20 Not Found          | 0x30 Other Party Disagreed       | 0x40 Unavailable or Expired    |     |     |     |     |     |     |     |     |     | 0xE0 Decrypt Failure                | 0xF0 Off Chain Failure                            |
| 1. Success                        | 0x01 Success            | 0x11 Allowed                  | 0x21 Found              | 0x31 Other Party Agreed          | 0x41 Available                 |     |     |     |     |     |     |     |     |     | 0xE1 Decrypt Success                | 0xF1 Off Chain Success                            |
| 2. Accepted / Started             | 0x02 Accepted / Started | 0x12 Requested Permission     | 0x22 Match Request Sent | 0x32 Sent Offer                  |                                |     |     |     |     |     |     |     |     |     | 0xE2 Signed                         | 0xF2 Off Chain Process Started                    |
| 3. Awaiting Others                | 0x03 Awaiting           | 0x13 Awaiting Permission      | 0x23 Awaiting Match     | 0x33 Awaiting Their Ratification | 0x43 Not Yet Available         |     |     |     |     |     |     |     |     |     | 0xE3 Other Party Signature Required | 0xF3 Awaiting Off Chain Completion                |
| 4. Action Required / Awaiting You | 0x04 Action Required    | 0x14 Awaiting Your Permission |                         | 0x34 Awaiting Your Ratification  | 0x44 Awaiting Your Availabity* |     |     |     |     |     |     |     |     |     | 0xE4 Your Signature Required        | 0xF4 Off Chain Action Required                    |
| 5.                                |                         |                               |                         |                                  |                                |     |     |     |     |     |     |     |     |     |                                     |                                                   |
| 6.                                |                         |                               |                         |                                  |                                |     |     |     |     |     |     |     |     |     |                                     |                                                   |
| 7.                                |                         |                               |                         |                                  |                                |     |     |     |     |     |     |     |     |     |                                     |                                                   |
| 8.                                |                         |                               |                         |                                  |                                |     |     |     |     |     |     |     |     |     |                                     |                                                   |
| 9.                                |                         |                               |                         |                                  |                                |     |     |     |     |     |     |     |     |     |                                     |                                                   |
| A.                                |                         |                               |                         |                                  |                                |     |     |     |     |     |     |     |     |     |                                     |                                                   |
| B.                                |                         |                               |                         |                                  |                                |     |     |     |     |     |     |     |     |     |                                     |                                                   |
| C.                                |                         |                               |                         |                                  |                                |     |     |     |     |     |     |     |     |     |                                     |                                                   |
| D.                                |                         |                               |                         |                                  |                                |     |     |     |     |     |     |     |     |     |                                     |                                                   |
| E.                                |                         |                               |                         |                                  |                                |     |     |     |     |     |     |     |     |     |                                     |                                                   |
| F. Meta/Info                      | 0x0F Metadata Only      |                               |                         |                                  |                                |     |     |     |     |     |     |     |     |     |                                     | 0xFF Data Source is Off Chain (ie: no guarantees) |

* Unused regions are available for further extension or custom codes
* On GitHub, yu may need to scroll the tables horizontally (they're pretty wide)

# Example Sequence Diagrams

```
0x03 = Waiting
0x31 = Other Party (ie: not you) Agreed
0x41 = Available
0x43 = Not Yet Available


                          Exchange


AwesomeCoin                 DEX                     TraderBot
     +                       +                          +
     |                       |       buy(AwesomeCoin)   |
     |                       | <------------------------+
     |         buy()         |                          |
     | <---------------------+                          |
     |                       |                          |
     |     Status [0x43]     |                          |
     +---------------------> |   Status [0x03, 0x43]    |
     |                       +------------------------> |
     |                       |                          |
     |                       |        isDoneYet()       |
     |                       | <------------------------+
     |                       |                          |
     |                       |    Status [0x03, 0x43]   |
     |                       +------------------------> |
     |                       |                          |
     |                       |                          |
     |     Status [0x41]     |                          |
     +---------------------> |                          |
     |                       |                          |
     |       buy()           |                          |
     | <---------------------+                          |
     |                       |                          |
     |                       |                          |
     |     Status [0x31]     |                          |
     +---------------------> |      Status [0x31]       |
     |                       +------------------------> |
     |                       |                          |
     |                       |                          |
     |                       |                          |
     |                       |                          |
     +                       +                          +
```



```
0x01 = Generic Success
0x10 = Disallowed
0x11 = Allowed

                                              Token Validation


           Buyer                  RegulatedToken           TokenValidator               IDChecker          SpendLimiter
             +                          +                         +                         +                   +
             |        buy()             |                         |                         |                   |
             +------------------------> |          check()        |                         |                   |
             |                          +-----------------------> |          check()        |                   |
             |                          |                         +-----------------------> |                   |
             |                          |                         |                         |                   |
             |                          |                         |         Status [0x10]   |                   |
             |                          |       Status [0x10]     | <-----------------------+                   |
             |        throw/revert      | <-----------------------+                         |                   |
             | <------------------------+                         |                         |                   |
             |                          |                         |                         |                   |
+---------------------------+           |                         |                         |                   |
|                           |           |                         |                         |                   |
| Updates ID with provider  |           |                         |                         |                   |
|                           |           |                         |                         |                   |
+---------------------------+           |                         |                         |                   |
             |                          |                         |                         |                   |
             |         buy()            |                         |                         |                   |
             +------------------------> |        check()          |                         |                   |
             |                          +-----------------------> |         check()         |                   |
             |                          |                         +-----------------------> |                   |
             |                          |                         |                         |                   |
             |                          |                         |          Status [0x11]  |                   |
             |                          |                         | <-----------------------+                   |
             |                          |                         |                         |                   |
             |                          |                         |                         |   check()         |
             |                          |                         +-------------------------------------------> |
             |                          |                         |                         |                   |
             |                          |                         |                         |  Status [0x11]    |
             |                          |       Status [0x11]     | <-------------------------------------------+
             |        Status [0x01]     | <-----------------------+                         |                   |
             | <------------------------+                         |                         |                   |
             |                          |                         |                         |                   |
             |                          |                         |                         |                   |
             |                          |                         |                         |                   |
             +                          +                         +                         +                   +
```
