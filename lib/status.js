const Category = require('./category');
const Reason = require('./reason');

const { toHexDigit } = require('./hex');

// Mappings

const combine = ({categoryId, reasonId}) => (categoryId * 16) + reasonId;

const split = (codeNum) => {
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

const hexify = (code) => {
  const {categoryId, reasonId} = split(code);
  return `0x${toHexDigit(categoryId)}${toHexDigit(reasonId)}`;
};

module.exports = {
  CATEGORY: Category.CATEGORY,
  REASON: Reason.REASON,
  combine,
  hexify,
  humanize,
  split,
  toHexString,
  toNumber
};
