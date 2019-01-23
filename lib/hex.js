const toHexDigit = (digit) => {
  if (digit < 0 || digit > 15 || digit % 1 !== 0) {
    throw new RangeError(`${digit} is not a hex digit`);
  }

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
  toHexDigit
};
