const { expect } = require('chai');

const expectRevert = async (func, msg = 'revert') => {
  try {
    await func();
    throw Error('Expected EVM failure');
  } catch ({ message }) {
    expect(message).to.have.string(msg);
  }
};

const randomInRange = (min, max) => Math.round(Math.random() * (max - min) + min);

module.exports = {
  expectRevert,
  randomInRange
};
