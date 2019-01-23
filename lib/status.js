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
  return `0x${toHexDigit(categoryId)}${toHexDigit(reasonId)}`;
};

module.exports = {
  CATEGORY: category.CATEGORY,
  REASON: reason.REASON,
  combine,
  toHexString,
  toNumber
};
