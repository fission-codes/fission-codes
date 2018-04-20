const { CATEGORIES } = require('./category');
const { REASONS } = require('./reason');

const fromCodes = (catNum, reasonNum) => `0x${catNum}${reasonNum}`;

const fromStrings = (categoryString, reasonString) => {
  const catNum = CATEGORIES.indexOf(categoryString);
  const reasonNum = REASONS.indexOf(reasonString);

  return `0x${catNum}${reasonNum}`;
};

module.exports = {
  CATEGORIES,
  REASONS,
  fromCodes,
  fromStrings
};
