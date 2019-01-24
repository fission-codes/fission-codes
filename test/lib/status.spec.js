const { expect } = require('chai');

const { randomInRange } = require('../helpers');
const { combine } = require('../../lib/status');

const format = /0x[0-9A-F]{2}/;

describe('status.js', () => {
  describe('#combine', () => {
    it('generates a number', () => {
      expect(combine(1, 2)).to.be.a('number');
    });

    it('left shifts first value by 4', () => {
      expect(combine(3, 0)).to.equal(48);
    });

    it('leaves the second value as-is', () => {
      expect(combine(0, 3)).to.equal(3);
    });
  });

  describe('#split', () => {

  });
  // describe('#humanize');
  // describe('#toNumber');
  // describe('#toHexString');
  // describe('#hexify');
});
