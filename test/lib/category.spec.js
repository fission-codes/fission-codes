const { expect } = require('chai');
const { toHexString, toNumber } = require('../../lib/category');

const hexRegex = /0x[0-9A-F]0/;

describe('category', () => {
  describe('#toHexString', () => {
    context('with hex value 0-9', () => {
      it('places the value into the template 0x_0', () => {
        expect(toHexString(4)).to.match(hexRegex);
      });

      it('leaves the number as a numeric character', () => {
        expect(toHexString(3).charAt(2)).to.equal('3');
      });
    });

    context('with hex value A-F', () => {
      it('places the value into the template 0x_0', () => {
        expect(toHexString(11)).to.match(hexRegex);
      });

      it('converts values to hex letters', () => {
        expect(toHexString(15).charAt(2)).to.equal('F');
      });
    });

    context('with non-hexable value', () => {
      it('throws', () => {
        expect(() => toHexString(123456789)).to.throw();
      });
    });
  });

  describe('#toNumber', () => {

  });
});
