const { toHexDigit } = require('./hex');

const REASON = [
  'FAILURE',
  'SUCCESS',

  'AWAITING_OTHERS',
  'ACCEPTED',
  'LOWER_LIMIT',
  'ACTION_REQUESTED',
  'UPPER_LIMIT',

  'x06',
  'x07',

  'INAPPLICABLE',

  'x09',
  'x0A',
  'x0B',
  'x0C',
  'x0D',
  'x0E',

  'INFORMATIONAL'
];

const toHexString = (num) => `0x0${toHexDigit(num)}`;

const toId = (reason) => {
  const idx = REASON.indexOf(reason);
  if (idx < 0) throw badLookup(reason);
  return idx;
};

const toNumber = toId;

const badLookup = (targetReason) =>
  Error(`${targetReason} is not a valid ERC-1066 reason`);

module.exports = {
  REASON,
  toHexString,
  toNumber,
  toId
};
