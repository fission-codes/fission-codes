const { expect } = require('chai');

const { randomInRange } = require('../../helpers');
const { REASON, toHexString, toId, toNumber } = require('../../../lib/fission/reason');

const hexRegex = /0x0[0-9A-F]/;

describe('reason', () => {
  const index = randomInRange(0, 15);
  const rsn = REASON[index];

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
        expect(() => toHexString(123456789)).to.throw(RangeError);
      });
    });

    context('with negative value', () => {
      it('throws', () => {
        expect(() => toHexString(-1)).to.throw(RangeError);
      });
    });

    context('with decimal', () => {
      it('throws', () => {
        expect(() => toHexString(3.14159)).to.throw(TypeError);
      });
    });
  });

  describe('#toId', () => {
    it('translates the reason name into its uint8 enum equivalent', () => {
      expect(toId(rsn)).to.equal(index);
    });

    context('not a valid reason', () => {
      it('throws', () => {
        expect(() => toId('foo')).to.throw(Error);
      });
    });

    context('not a string', () => {
      it('throws', () => {
        expect(() => toId(42)).to.throw(Error);
      });
    });

    context('wrong case', () => {
      it('throws', () => {
        expect(() => toId('success')).to.throw(Error);
      });
    });
  });

  describe('#toNumber', () => {
    it('translates the reason name into its uint8 enum equivalent', () => {
      expect(toNumber(rsn)).to.equal(index);
    });

    context('not a valid reason', () => {
      it('throws', () => {
        expect(() => toNumber('foo')).to.throw(Error);
      });
    });

    context('not a string', () => {
      it('throws', () => {
        expect(() => toNumber(42)).to.throw(Error);
      });
    });

    context('wrong case', () => {
      it('throws', () => {
        expect(() => toNumber('success')).to.throw(Error);
      });
    });
  });
});
