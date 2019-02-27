const { toHexDigit } = require('./hex');

const REASONS = Object.freeze({
  FAILURE: 0x00,
  SUCCESS: 0x01,

  AWAITING_OTHERS: 0x02,
  ACCEPTED: 0x03,
  LOWER_LIMIT: 0x04,
  ACTION_REQUESTED: 0x05,
  UPPER_LIMIT: 0x06,

  x07: 0x07,

  INAPPLICABLE: 0x08,

  x09: 0x09,
  x0A: 0x0A,
  x0B: 0x0B,
  x0C: 0x0C,
  x0D: 0x0D,
  x0E: 0x0E,

  INFORMATIONAL: 0x0F
 });

const REASON_NAMES = Object.freeze(Object.keys(REASONS));

const toNumber = (name) => {
  const id = REASONS[name];
  if (!id) throw badLookup(name);
  return id;
};

const toHexString = (num) => `0x0${toHexDigit(num)}`;

const badLookup = (targetReason) =>
  Error(`${targetReason} is not a valid ERC-1066 reason`);

module.exports = {
  REASONS,
  REASON_NAMES,
  badLookup,
  toHexString,
  toNumber
};
