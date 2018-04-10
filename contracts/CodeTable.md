# Possible Status Code Schemes

## Notes

* Unused regions are available for further extension or custom codes
* On GitHub, yu may need to scroll the tables horizontally (they're pretty wide)

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

### Advantages

* Simple
* Perfectly square
* Works well with EVM assembly
* Lots of space along either axis for extension

### Disadvantages

* Hex literals are unfamliar to some

## `uint8` Table Encoding

| X. Second Digit                   | 0. Generic           | 10. Permission              | 20. Find/Match/&c     | 30. Negotiation / Offers       | 40. Availability             | 50. | 60. | 70. | 80. Cryptography                  | 90. Off Chain                                   | 100. | 110. | 120. | 130. | 140. | 150. | 160. | 170. | 180. | 190. | 200. | 210. | 220. | 230. | 240. | 250. |
|-----------------------------------|----------------------|-----------------------------|-----------------------|--------------------------------|------------------------------|-----|-----|-----|-----------------------------------|-------------------------------------------------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| 0. Failure                        | 0 Failure            | 10 Disallowed               | 20 Not Found          | 30 Other Party Disagreed       | 40 Unavailable or Expired    |     |     |     | 80 Decrypt Failure                | 90 Off Chain Failure                            |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |
| 1. Success                        | 1 Success            | 11 Allowed                  | 21 Found              | 31 Other Party Agreed          | 41 Available                 |     |     |     | 81 Decrypt Success                | 91 Off Chain Success                            |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |
| 2. Accepted / Started             | 2 Accepted / Started | 12 Requested Permission     | 22 Match Request Sent | 32 Sent Offer                  |                              |     |     |     | 82 Signed                         | 92 Off Chain Process Started                    |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |
| 3. Awaiting Others                | 3 Awaiting           | 13 Awaiting Permission      | 23 Awaiting Match     | 33 Awaiting Their Ratification | 43 Not Yet Available         |     |     |     | 83 Other Party Signature Required | 93 Awaiting Off Chain Completion                |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |
| 4. Action Required / Awaiting You | 4 Action Required    | 14 Awaiting Your Permission |                       | 34 Awaiting Your Ratification  | 44 Awaiting Your Availabity* |     |     |     | 84 Your Signature Required        | 94 Off Chain Action Required                    |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |
| 5.                                |                      |                             |                       |                                |                              |     |     |     |                                   |                                                 |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |
| 6.                                |                      |                             |                       |                                |                              |     |     |     |                                   |                                                 |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      | X    |
| 7.                                |                      |                             |                       |                                |                              |     |     |     |                                   |                                                 |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      | X    |
| 8.                                |                      |                             |                       |                                |                              |     |     |     |                                   |                                                 |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      | X    |
| 9. Meta/Info                      | 9 Metadata Only      |                             |                       |                                |                              |     |     |     |                                   | 99 Data Source is Off Chain (ie. no guarantees) |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      | X    |

### Advantages

* Integers are very familiar and easy to construct
* _Lots_ of space for extension along the horizontal axis

### Disadvantages

* Less exensible along the vertical axis
* Not symmetrical: grid breaks for `x >= 255`

## `uint16` composable mask

| Index | Meaning              |
|-------|----------------------|
|     0 | Meta/Info            |
|     1 | Generic              |
|     2 |                      |
|     3 |                      |
|     4 | Ready                |
|     5 | Accepted / Started   |
|     6 | Awaiting Others      |
|     7 | Your Action Required |
|     8 |                      |
|     9 |                      |
|    10 | Negotiation/Offers   |
|    11 | Permission           |
|    12 | Availability         |
|    13 | Find/Match           |
|    14 | Cryptography         |
|    15 | Off Chain            |

### Examples

* `0100 0000 0000 0000`: Generic success
* `0000 0010 0010 0000`: Awaiting other party's ratifcation
* `0000 0000 0000 0010`: Decrypt failed, in context of decryption
* `0000 1000 0010 0001`: Off chain negotiation succeeded, awaiting your action

### Advantages

* This encoding efficiently can pack certain combinations of status codes into one number

### Disadvantages

* Larger
* Has less room for extension
* Since multiple options are always possible, it's easier to have incoherent states like
  * `1100 0000 0000 0000`
  * `1111 1111 1111 1111`

## Footnotes

* ie: "Ready when you are" or "please send when you are ready"

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
