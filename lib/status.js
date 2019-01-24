const Category = require('./category');
const Reason = require('./reason');

const { toHexDigit } = require('./hex');

// Mappings

const combine = ({categoryId, reasonId}) => (categoryId * 16) + reasonId;

const split = (codeNum) => {
  if (!Number.isInteger(codeNum)) throw TypeError(`${codeNum} is not a number`);
  if (codeNum < 0 || codeNum > 255) throw RangeError(`${codeNum} is not a valid ERC-1066 code`);

  return {
    categoryId: Math.floor(codeNum / 16),
    reasonId:   codeNum % 16
  };
};

// Convenience

const humanize = ({categoryId, reasonId}) => {
  return {
    category: Category.CATEGORY[categoryId],
    reason:   Reason.REASON[reasonId]
  };
};

// Formatters

const toNumber = ({category, reason}) => {
  const categoryId = Category.CATEGORY.indexOf(category);
  if (categoryId < 0) throw Category.badLookup(category);

  const reasonId = Reason.REASON.indexOf(reason);
  if (reasonId < 0) throw Reason.badLookup(reason);

  return combine({categoryId, reasonId});
};

const toHexString = ({category, reason}) => {
  const catNum    = Category.CATEGORY.indexOf(category);
  const reasonNum = Reason.REASON.indexOf(reason);

  return `0x${toHexDigit(catNum)}${toHexDigit(reasonNum)}`;
};

const hexifyCode = (codeNum) => {
  const {categoryId, reasonId} = split(codeNum);
  return `0x${toHexDigit(categoryId)}${toHexDigit(reasonId)}`;
};

module.exports = {
  CATEGORY: Category.CATEGORY,
  REASON: Reason.REASON,
  combine,
  hexifyCode,
  humanize,
  split,
  toHexString,
  toNumber
};
