# ESC `. ... -.-.`
## Ethereum Status Codes
Broadly applicable status codes for Ethereum smart contracts

[![CircleCI](https://circleci.com/gh/expede/ethereum-status-codes.svg?style=svg)](https://circleci.com/gh/expede/ethereum-status-codes) [![Maintainability](https://api.codeclimate.com/v1/badges/a1ef619028bc0786c327/maintainability)](https://codeclimate.com/github/expede/ethereum-status-codes/maintainability)
[![](https://img.shields.io/badge/built%20with%20%F0%9F%92%96%20by-SPADE%20Co-purple.svg)](https://spade.builders)

# Table of Contents

* [Motivation](#motivation)
* [Approach](#approach)
* [Code Table](#code-table)
* [Example Sequence Diagrams](#example-sequence-diagrams)

# Motivation

## Autonomy

Smart contracts are largely intended to be autonomous. While each contract may
define a specific interface, having a common set of semantic codes can help
developers write code that can react appropriately to various situations.

## Semantically Rich

HTTP status codes are widely used for this purpose. BEAM languages use atoms
and tagged tuples to signify much the same information. Both provide a lot of
information both to the programmer (debugging for instance), and to the program
that needs to decide what to do next.

ESCs convey a much richer set of information than booleans,
and are able to be reacted to autonomously unlike arbitrary strings.

## User Feedback

Since status codes are finite and known in advance, we can provide global,
human-readable sets of status messages. These may also be translated into any language,
differing levels of technical detail, added as `revert` messages, natspecs, and so on.

We also see a desire for this [in transactions](http://eips.ethereum.org/EIPS/eip-658),
and there's no reason that ESCs couldn't be used by the EVM itself.

# Approach

## Encoding

ESCs are encoded as a `byte`. Hex values break nicely into high and low nibbles:
`category` and `reason`. For instance, `hex"01"` stands for general success
and `hex"00"` for general failure.

`byte` is quite lightweight, and can be easily packed with multiple codes into
a `bytes32` (or similar) if desired. It is also easily interoperable with `uint8`,
cast from `enum`s, and so on.

## Human Readable

Developers should not be required to memorize 256 codes. However, they break nicely into a table.
Cognitive load is lowered by organizing the table into categories and reasons.
`0x10` and `0x11` belong to the same category, and `0x04` shares a reason with `0x24`

While this repository includes helper enums, we have found working directly in
the hex values to be quite natural. ESC `0x10` is just as comfortable as HTTP 401, for example.

## Extensiblilty

The `0xA` category is reserved for application-specific statuses.
In the case that 256 codes become insufficient, `bytes1` my be embedded in larger byte arrays.

# Code Table

| X. Low Nibble                     | 0. Generic              | 10. Permission                | 20. Find/Match/&c       | 30. Negotiation / Offers         | 40. Availability                 | 50. | 60. | 70. | 80. | 90. | A0. | B0. | C0. | D0. | E0. Cryptography                    | F0. Off Chain                                     |
|-----------------------------------|-------------------------|-------------------------------|-------------------------|----------------------------------|----------------------------------|-----|-----|-----|-----|-----|-----|-----|-----|-----|-------------------------------------|---------------------------------------------------|
| 0. Failure                        | 0x00 Failure            | 0x10 Disallowed               | 0x20 Not Found          | 0x30 Other Party Disagreed       | 0x40 Unavailable or Expired      |     |     |     |     |     |     |     |     |     | 0xE0 Decrypt Failure                | 0xF0 Off Chain Failure                            |
| 1. Success                        | 0x01 Success            | 0x11 Allowed                  | 0x21 Found              | 0x31 Other Party Agreed          | 0x41 Available                   |     |     |     |     |     |     |     |     |     | 0xE1 Decrypt Success                | 0xF1 Off Chain Success                            |
| 2. Accepted / Started             | 0x02 Accepted / Started | 0x12 Requested Permission     | 0x22 Match Request Sent | 0x32 Sent Offer                  |                                  |     |     |     |     |     |     |     |     |     | 0xE2 Signed                         | 0xF2 Off Chain Process Started                    |
| 3. Awaiting Others                | 0x03 Awaiting           | 0x13 Awaiting Permission      | 0x23 Awaiting Match     | 0x33 Awaiting Their Ratification | 0x43 Not Yet Available           |     |     |     |     |     |     |     |     |     | 0xE3 Other Party Signature Required | 0xF3 Awaiting Off Chain Completion                |
| 4. Action Required / Awaiting You | 0x04 Action Required    | 0x14 Awaiting Your Permission |                         | 0x34 Awaiting Your Ratification  | 0x44 Awaiting Your Availability* |     |     |     |     |     |     |     |     |     | 0xE4 Your Signature Required        | 0xF4 Off Chain Action Required                    |
| 5.                                |                         |                               |                         |                                  |                                  |     |     |     |     |     |     |     |     |     |                                     |                                                   |
| 6.                                |                         |                               |                         |                                  |                                  |     |     |     |     |     |     |     |     |     |                                     |                                                   |
| 7.                                |                         |                               |                         |                                  |                                  |     |     |     |     |     |     |     |     |     |                                     |                                                   |
| 8.                                |                         |                               |                         |                                  |                                  |     |     |     |     |     |     |     |     |     |                                     |                                                   |
| 9.                                |                         |                               |                         |                                  |                                  |     |     |     |     |     |     |     |     |     |                                     |                                                   |
| A.                                |                         |                               |                         |                                  |                                  |     |     |     |     |     |     |     |     |     |                                     |                                                   |
| B.                                |                         |                               |                         |                                  |                                  |     |     |     |     |     |     |     |     |     |                                     |                                                   |
| C.                                |                         |                               |                         |                                  |                                  |     |     |     |     |     |     |     |     |     |                                     |                                                   |
| D.                                |                         |                               |                         |                                  |                                  |     |     |     |     |     |     |     |     |     |                                     |                                                   |
| E.                                |                         |                               |                         |                                  |                                  |     |     |     |     |     |     |     |     |     |                                     |                                                   |
| F. Meta/Info                      | 0x0F Metadata Only      |                               |                         |                                  |                                  |     |     |     |     |     |     |     |     |     |                                     | 0xFF Data Source is Off Chain (ie: no guarantees) |

* Unused regions are available for further extension or custom codes
* You may need to scroll the tables horizontally (they're pretty wide)

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
             |                          |                         |       Status [0x11]     |                   |
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

# Sponsors

[![](/static/sponsors/Tachyon.png)](https://tachyoncv.vc/)
[![](/static/sponsors/Robot-Overlord.png)](https://robotoverlord.io/)

# Featured On

[![](/static/sponsors/Tech-Crunch-Logo-@2x.png)](https://techcrunch.com/2018/09/07/consensys-details-the-first-cohort-of-companies-to-enter-its-new-accelerator-tachyon/)
