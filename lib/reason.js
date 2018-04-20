const REASON = [
  'Failure',
  'Success',
  'Acceptance',
  'AwaitingOthers',
  'ActionRequired',

  'x05',
  'x06',
  'x07',
  'x08',
  'x09',

  'AppReason',

  'x0B',
  'x0C',
  'x0D',
  'x0E',

  'Info'
];

const toHex = (num) => `0x0${num}`;

module.exports = { REASON, toHex };
