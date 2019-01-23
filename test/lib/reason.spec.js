const { expect } = require('chai');

const { randomInRange } = require('../helpers');
const { REASON, toHexString, toId, toNumber } = require('../../lib/reason');

const hexRegex = /0x0[0-9A-F]/;

describe('category', () => {
  const index = randomInRange(0, 15);
  const cat = REASON[index];

  describe('#toHexString', () => {
    context('with hex value 0-9', () => {
      it('places the value into the template 0x0_', () => {
        expect(toHexString(4)).to.match(hexRegex);
      });

      it('leaves the number as a numeric character', () => {
        expect(toHexString(3).charAt(3)).to.equal('3');
      });
    });

    context('with hex value A-F', () => {
      it('places the value into the template 0x_0', () => {
        expect(toHexString(11)).to.match(hexRegex);
      });

      it('converts values to hex letters', () => {
        expect(toHexString(15).charAt(3)).to.equal('F');
      });
    });

    context('with value > 15', () => {
      it('throws', () => {
        expect(() => toHexString(123456789)).to.throw();
      });
    });

    context('with negative value', () => {
      it('throws', () => {
        expect(() => toHexString(-1)).to.throw();
      });
    });

    context('with decimal', () => {
      it('throws', () => {
        expect(() => toHexString(3.14159)).to.throw();
      });
    });
  });

  describe('#toId', () => {
    it('translates the category name into its uint8 enum equivalent', () => {
      expect(toId(cat)).to.equal(index);
    });

    context('not a valid category', () => {
      it('throws', () => {
        expect(() => toId('foo')).to.throw();
      });
    });

    context('not a string', () => {
      it('throws', () => {
        expect(() => toId(42)).to.throw();
      });
    });

    context('downcased', () => {
      it('throws', () => {
        expect(() => toId(cat.toLowerCase())).to.throw();
      });
    });
  });

  describe('#toNumber', () => {
    it('translates the category name into its uint8 enum equivalent', () => {
      expect(toNumber(cat)).to.equal(index);
    });

    context('not a valid category', () => {
      it('throws', () => {
        expect(() => toNumber('foo')).to.throw();
      });
    });

    context('not a string', () => {
      it('throws', () => {
        expect(() => toNumber(42)).to.throw();
      });
    });

    context('downcased', () => {
      it('throws', () => {
        expect(() => toNumber(cat.toLowerCase())).to.throw();
      });
    });
  });
});
