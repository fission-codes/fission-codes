![](./static/FISSION-logomark.svg)

## Powering Mircoservices for Web3

[`FISSION`](https://fission.codes) is a set of useful status codes and translated messages to connect smart contracts of all kinds 🔌

[![Build Status](https://travis-ci.org/fission-suite/fission-codes.svg?branch=master)](https://travis-ci.org/fission-suite/fission-codes)
[![Maintainability](https://api.codeclimate.com/v1/badges/a1ef619028bc0786c327/maintainability)](https://codeclimate.com/github/expede/ethereum-status-codes/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/fission-suite/fission-codes/badge.svg)](https://coveralls.io/github/fission-suite/fission-codes)
[![Built with ❤ by SPADE Co](https://img.shields.io/badge/built%20with%20%F0%9F%92%96%20by-SPADE%20Co-purple.svg)](https://spade.builders)
[![ERC1066](https://img.shields.io/badge/ERC-1066-42A.svg)](https://eips.ethereum.org/EIPS/eip-1066)
[![ERC1444](https://img.shields.io/badge/ERC-1444-414.svg)](https://github.com/ethereum/EIPs/blob/56f86922bbd3777174cdbf2e0d01d38c6306b9c0/EIPS/eip-1444.md)

# Quickstart

```bash
npm install --save fission-codes
```

```solidity
// Solidity
pragma solidity ^0.5.0;
import { FISSION } from "/fission-codes/contracts/FISSION.sol";
```

```js
// JS
const * as fission = require('fission-codes');
```

# Table of Contents

* [Motivation](#motivation)
* [Example](#example)
    * [Scenario](#scenario)
    * [Smart Contracts](#smart-contracts)
* [Name](#name)
* [Ethereum Improvement Proposals](#ethereum-improvement-proposals)
* [Resources](#resources)
    * [Documentation](#documentation)
    * [Presentations](#presentations)
    * [Discussions](#discussions)
    * [Articles](#articles)
* [Badge](#badge)
* [Sponsors](#sponsors)
* [Featured On](#featured-on)

# Motivation

## Autonomy

Smart contracts are largely intended to be autonomous. While each contract may define a specific interface, having a common set of semantic codes can help developers write code that can react appropriately to various situations.

## Semantically Rich

HTTP status codes are widely used for this purpose. BEAM languages use atoms and tagged tuples to signify much the same information. Both provide a lot of information both to the programmer (debugging for instance), and to the program that needs to decide what to do next.

FISSIONs convey a much richer set of information than booleans, and are able to be reacted to autonomously unlike arbitrary strings.

## User Feedback

Since status codes are finite and known in advance, we can provide global, human-readable sets of status messages. These may also be translated into any language, differing levels of technical detail, added as `revert` messages, natspecs, and so on.

We also see a desire for this [in transactions](http://eips.ethereum.org/EIPS/eip-658), and there's no reason that FISSIONs couldn't be used by the EVM itself.

# Example

## Scenario

It's common for one group of users to make use of several contracts. It would be useful to register this information once, and share it among many different contracts, rather than duplicating this information across many places (with potential inconsistencies).

For instance, if a teammate is promoted to admin status, this should be reflected across all of the shared contracts. Likewise, if someone is banned, it is much easier to make this change once and rest assured that it covers all of our contracts.

## Smart Contracts

Here we create a contract `Auth` which consolodates this information. It returns a common set of permissions codes from FISSION as a simple way of communicating with other contracts.

```solidity
pragma solidity ^0.5.0;

import { FISSION } from "fission-codes/contracts/FISSION.sol";

contract SimpleAuth {
    enum Level {
        Banned,
        Unregistered,
        Member,
        Admin
    }

    mapping (address => Level) private auth;

    constructor() public {
        auth[tx.origin] = Level.Admin;
    }

    function min(Level minLevel) public view returns (byte status) {
        if (auth[tx.origin] == Level.Banned) { return FISSION.code(FISSION.Status.Revoked); }
        if (auth[tx.origin] < minLevel) { return FISSION.code(FISSION.Status.Disallowed_Stop); }
        return FISSION.code(FISSION.Status.Allowed_Go);
    }

    function set(address who, Level level) public nonpayable returns (byte status) {
        require(auth[tx.origin] == Level.Admin, "Must be an admin");
        auth[who] = level;
        return FISSION.code(FISSION.Status.Success)
    }
}
```

There may be many collaborator contracts. Below is a portfolio controlled by the `SimpleAuth` members.

```solidity
contract Portfolio {
    address private auth;
    mapping (address => bool) private holdings;

    constructor (address control) public {
        auth = control;
    }

    function isHeld(address token) external view returns (byte status, bool held) {
        byte permission = auth.min(SimpleAuth.Level.Unregistered);
        if (isBlocking(permission)) { return (permission, false); }
        return (FISSION.code(FISSION.Status.Found_Equal_InRange), holdings[token)];
    }

    function setTracking(address token, bool track) external nonpayable returns (byte status) {
        requireSuccess(auth.min(SimpleAuth.Level.Member));
        holdings[token] = track;
        return FISSION.code(FISSION.Status.Success);
    }
}
```

# Name

Fluid Interface for Scalable Smart contract InterOperable Networks

# Ethereum Improvement Proposals

This library contains implementations of these EIPs:

* [ERC1066: Status Codes](https://eips.ethereum.org/EIPS/eip-1066)
* [ERC1444: Signal Translations](https://github.com/ethereum/EIPs/pull/1444)

# Resources

## Documentation

* [Official Website](https://fission.codes)

## Presentations

* [devcon iv](https://slideslive.ch/38911936/erc1066-better-ux-dx-in-just-one-byte)
* [Ethereum Magicians: Council of Berlin](https://view.ly/v/eljSU6DKXpyC)

## Discussions

* [Ethereum Magicians: `erc-1066`](https://ethereum-magicians.org/tags/erc-1066)
* [Ethereum Magicians: `erc-1444`](https://ethereum-magicians.org/tags/erc-1444)

## Articles

* [A Smarter Contract Protocol](https://spade.builders/esc/)
* [Introducing FISSION Translate](https://medium.com/spadebuilders/introducing-fission-translate-a-global-translation-layer-for-smart-contract-communication-bacd61110e82)

# Badge

[![FISSION compatible](https://github.com/fission-suite/fission-codes/raw/logo/static/FISSION-badge.svg?sanitize=true)](https://fission.codes)

```markdown
<!-- README.md -->
[![FISSION compatible](https://github.com/fission-suite/fission-codes/raw/logo/static/FISSION-badge.svg?sanitize=true)](https://fission.codes)
```

```html
<!-- website.html -->
<a href="https://fission.codes"><img alt="FISSION compatible" src="https://github.com/fission-suite/fission-codes/raw/logo/static/FISSION-badge.svg?sanitize=true"/></a>
```

# Sponsors

[<img src="./static/sponsors/Tachyon.png" height="200" />](https://tachyoncv.vc/)
[<img src="./static/sponsors/Robot-Overlord.png" height="200" />](http://robotoverlord.io)

# Featured On

[<img src="./static/sponsors/Tech-Crunch-Logo-@2x.png" height="75" />](https://techcrunch.com/2018/09/07/consensys-details-the-first-cohort-of-companies-to-enter-its-new-accelerator-tachyon/)
