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
import "/fission-codes/contracts/Status.sol";
```

```js
// JS
const fission = require('fission-codes');
```

# Table of Contents

* [Example](#example)
* [Motivation](#motivation)
* [Ethereum Improvement Proposals](#ethereum-improvement-proposals)
* [Resources](#resources)
    * [Documentation](#documentation)
    * [Ethereum Magicians](#ethereum-magicians)
    * [Articles](#articles)
    * [Contact](#contact)
* [Sponsors](#sponsors)
* [Featured On](#featured-on)

# Example

```solidity
contract Foo {
  constructor () {
  }

  function {
  }
}

contract Bar {
}

contract Baz {
}
```

# Motivation

## Autonomy

Smart contracts are largely intended to be autonomous. While each contract may define a specific interface, having a common set of semantic codes can help developers write code that can react appropriately to various situations.

## Semantically Rich

HTTP status codes are widely used for this purpose. BEAM languages use atoms and tagged tuples to signify much the same information. Both provide a lot of information both to the programmer (debugging for instance), and to the program that needs to decide what to do next.

FISSIONs convey a much richer set of information than booleans, and are able to be reacted to autonomously unlike arbitrary strings.

## User Feedback

Since status codes are finite and known in advance, we can provide global, human-readable sets of status messages. These may also be translated into any language, differing levels of technical detail, added as `revert` messages, natspecs, and so on.

We also see a desire for this [in transactions](http://eips.ethereum.org/EIPS/eip-658), and there's no reason that FISSIONs couldn't be used by the EVM itself.

# Ethereum Improvement Proposals

This library contains implementations of these EIPs:

* [ERC1066: Status Codes](https://eips.ethereum.org/EIPS/eip-1066)
* [ERC1444: Signal Translations](https://github.com/ethereum/EIPs/pull/1444)

# Resources

## Documentation

* [Official Website](https://fission.codes)

## Ethereum Magicians

* [Tag: `erc-1066`](https://ethereum-magicians.org/tags/erc-1066)
* [Tag: `erc-1444`](https://ethereum-magicians.org/tags/erc-1444)

## Articles

* [A Smarter Contract Protocol](https://spade.builders/esc/)
* [Introducing FISSION Translate](https://medium.com/spadebuilders/introducing-fission-translate-a-global-translation-layer-for-smart-contract-communication-bacd61110e82)

## Contact

* [SPADE's FISSION Discord](https://discord.gg/hQfgyz2)

# Sponsors

[<img src="./static/sponsors/Tachyon.png" height="200" />](https://tachyoncv.vc/)
[<img src="./static/sponsors/Robot-Overlord.png" height="200" />](http://robotoverlord.io)

# Featured On

[<img src="./static/sponsors/Tech-Crunch-Logo-@2x.png" height="75" />](https://techcrunch.com/2018/09/07/consensys-details-the-first-cohort-of-companies-to-enter-its-new-accelerator-tachyon/)
