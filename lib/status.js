import * as category from './category';
import * as reason from './reason';

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
    category: category.CATEGORY[categoryId],
    reason:   reason.REASON[reasonId]
  };
};

// Formatters

const toNumber = (categoryString, reasonString) => {
  const categoryId = category.CATEGORY.indexOf(categoryString);
  if (categoryId < 0) throw category.badLookup(categoryString);

  const reasonId = reason.REASON.indexOf(reasonString);
  if (reasonId < 0) throw reason.badLookup(reasonString);

  return combine(category, reason);
};

const toHexString = (categoryString, reasonString) => {
  const catNum    = category.CATEGORY.indexOf(categoryString);
  const reasonNum = reason.REASON.indexOf(reasonString);

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
    return 'A';
  case 11:
    return 'B';
  case 12:
    return 'C';
  case 13:
    return 'D';
  case 14:
    return 'E';
  case 15:
    return 'F';
  default:
    return String(digit);
  }
};

module.exports = {
  CATEGORY: category.CATEGORY,
  REASON: reason.REASON,
  combine,
  toHexString,
  toNumber
};
