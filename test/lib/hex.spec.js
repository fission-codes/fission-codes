const { expect } = require('chai');

const { randomInRange } = require('../helpers');
const { toHexDigit } = require('../../lib/hex');

const format = /[0-9A-F]/;

describe('hex.js', () => {
  describe('#toHexDigit', () => {
    it('generates a single character', () => {
      expect(toHexDigit(randomInRange(0, 15))).to.have.length(1);
    });

    it('only contains valid hex digits', () => {
      expect(toHexDigit(randomInRange(0, 15))).to.match(format);
    });

    it('simply wraps single numbers', () => {
      const num = randomInRange(0, 9);
      expect(toHexDigit(num)).to.equal(String(num));
    });

    it('converts to hex letters for higher numbers', () => {
      const num = randomInRange(10, 15);
      expect(toHexDigit(num)).to.match(/[A-F]/);
    });

    describe('invalid input validation', () => {
      context('negative number', () => {
        it('throws', () => {
          expect(() => toHexDigit(-1)).to.throw();
        });
      });

      context('number above 15', () => {
        it('throws', () => {
          expect(() => toHexDigit(16)).to.throw();
        });
      });

      context('decimal', () => {
        it('throws', () => {
          expect(() => toHexDigit(-1)).to.throw();
        });
      });

      context('non-numeric', () => {
        it('throws', () => {
          expect(() => toHexDigit(true)).to.throw();
        });

        it('throws', () => {
          expect(() => toHexDigit('3')).to.throw();
        });
      });
    });
  });
});
