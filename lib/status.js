const { CATEGORY } = require('./category');
const { REASON } = require('./reason');

// Mappings

const combine = (categoryIdx, reasonIdx) => (categoryIdx * 16) + reasonIdx;

const split = (codeNum) => {
  return {
    categoryId: Math.floor(codeNum / 16),
    reasonId:   codeNum % 16
  };
};

// Convenience

const humanize = ({categoryId, reasonId}) => {
  return {
    category: CATEGORY[categoryId],
    reason:   REASON[reasonId]
  };
};

// Formatters

// (String, String) -> Integer
const toNumber = (categoryString, reasonString) => {
  const category = CATEGORY.indexOf(categoryString);
  const reason = REASON.indexOf(reasonString);

  if (category instanceof Error) return category;
  if (reason   instanceof Error) return reason;

  return combine(category, reason);
};

// (Strng, String) -> HexString
const toHexString = (categoryString, reasonString) => {
  const catNum    = CATEGORY.indexOf(categoryString);
  const reasonNum = REASON.indexOf(reasonString);

  return `0x${catNum}${reasonNum}`;
};

const hexify = (code) => {
  const {categoryId, reasonId} = split(code);
  return `0x${hexDigit(categoryId)}${hexDigit(reasonId)}`;
};

// Helpers

const hexDigit = (digit) => {
  if (digit < 0 || digit > 15) throw new RangeError(`${digit} is not a hex digit`);

  switch(digit) {
  case 10:
    return "A";
  case 11:
    return "B";
  case 12:
    return "C";
  case 13:
    return "D";
  case 14:
    return "E";
  case 15:
    return "F";
  default:
    return String(digit);
  }
};

module.exports = {
  CATEGORY,
  REASON,
  combine,
  toHexString,
  toNumber
};
