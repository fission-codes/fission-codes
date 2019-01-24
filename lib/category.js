const { toHexDigit } = require('./hex');

const CATEGORY = [
  'GENERIC',
  'PERMISSION',
  'FIND',
  'NEGOTIATION',
  'AVAILABILITY',
  'FINANCE',

  'x60',
  'x70',
  'x80',
  'x90',

  'APPLICATION_SPECIFIC',

  'xB0',
  'xC0',
  'xD0',

  'CRYPTOGRAPHY',
  'OFF_CHAIN'
];

const toId = (category) => {
  const idx = CATEGORY.indexOf(category);
  if (idx < 0) throw badLookup(category);
  return idx;
};

const toNumber = (category) => toId(category) * 16;

const toHexString = (num) => `0x${toHexDigit(num)}0`;

const badLookup = (targetCategory) =>
  Error(`${targetCategory} is not a valid ERC-1066 category`);

module.exports = {
  CATEGORY,
  toHexString,
  toNumber,
  toId
};
