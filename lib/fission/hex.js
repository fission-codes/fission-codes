const toHexDigit = (digit) => {
  //Validation
  if (!Number.isInteger(digit)) throw TypeError(`${digit} is not a number`);
  if (digit < 0 || digit > 15) throw RangeError(`${digit} is not a hex digit`);

  // Conversion
  return (digit < 10) ? String(digit) : String.fromCharCode(55 + digit);
};

module.exports = {
  toHexDigit
};
