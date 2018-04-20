const { expect } = require('chai');

const expectRevert = async (func, msg = 'revert') => {
  try {
    await func();
    throw new Error('Expected EVM failure');
  } catch ({ message }) {
    expect(message).to.have.string(msg);
  }
};

module.exports = {
  expectRevert
};
