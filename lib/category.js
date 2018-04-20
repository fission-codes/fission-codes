const CATEGORIES = [
  'generic',
  'permission',
  'match',
  'offer',
  'availability',

  'x50',
  'x60',
  'x70',
  'x80',
  'x90',

  'appCategory',

  'xB0',
  'xC0',
  'xD0',

  'cryptography',
  'offChain'
];

const toHex = (num) => `0x${num}0`;

module.exports = { CATEGORIES, toHex };
