const { toHexDigit } = require('./hex');

const CATEGORIES = Object.freeze({
  GENERIC:      0x0,
  PERMISSION:   0x1,
  FIND:         0x2,
  NEGOTIATION:  0x3,
  AVAILABILITY: 0x4,
  FINANCE:      0x5,

  x60: 0x6,
  x70: 0x7,
  x80: 0x8,
  x90: 0x9,

  APPLICATION_SPECIFIC: 0xA,

  xB0: 0xB,
  xC0: 0xC,
  xD0: 0xD,

  CRYPTOGRAPHY: 0xE,
  OFF_CHAIN:    0xF
});

const CATEGORY_NAMES = Object.freeze(Object.keys(CATEGORIES));

const toNumber = (name) => {
  const id = CATEGORIES[name];
  if (id === undefined) throw badLookup(name);
  return id * 0x10;
};

const toHexString = (num) => `0x${toHexDigit(num)}0`;

const badLookup = (targetCategory) =>
  Error(`${targetCategory} is not a valid ERC-1066 category`);

module.exports = {
  CATEGORIES,
  CATEGORY_NAMES,
  toHexString,
  toNumber,
  badLookup
};
