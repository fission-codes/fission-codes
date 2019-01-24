const { expect } = require('chai');

const { randomInRange } = require('../helpers');

const {
  CATEGORY,
  REASON,
  combine,
  hexify,
  humanize,
  split,
  toHexString,
  toNumber
} = require('../../lib/status');

const format = /0x[0-9A-F]{2}/;

describe('status.js', () => {
  describe('#combine', () => {
    it('generates a number', () => {
      expect(combine({categoryId: 1, reasonId: 2})).to.be.a('number');
    });

    it('left shifts first value by 4', () => {
      expect(combine({categoryId: 3, reasonId: 0})).to.equal(48);
    });

    it('leaves the second value as-is', () => {
      expect(combine({categoryId: 0, reasonId: 3})).to.equal(3);
    });
  });

  describe('#split', () => {
    const decomposed = split(randomInRange(0, 256));

    it('has the correct keys', () => {
      expect(decomposed).to.have.all.keys('categoryId', 'reasonId');
    });

    describe('categoryId', () => {
      const { categoryId } = decomposed;

      it('is a single hex number', () => {
        expect(categoryId).to.be.within(0, 15);
      });
    });

    describe('reasonId', () => {
      const { reasonId } = decomposed;

      it('is a single hex number', () => {
        expect(reasonId).to.be.within(0, 15);
      });
    });
  });

  describe('#humanize', () => {
    const categoryId = randomInRange(0, 15);
    const reasonId = randomInRange(0, 15);

    const ids = { categoryId, reasonId };

    it('has a category string', () => {
      expect(humanize(ids)).to.include.all.keys('category', 'reason');
    });

    describe('category', () => {
      const { category } = humanize(ids);

      it('is a string', () => {
        expect(category).to.be.a('string');
      });

      it('is the corresponding category enum', () => {
        expect(category).to.equal(CATEGORY[categoryId]);
      });
    });

    describe('reason', () => {
      const { reason } = humanize(ids);

      it('is a string', () => expect(reason).to.be.a('string'));

      it('is the corresponding reason enum', () => {
        expect(reason).to.equal(REASON[reasonId]);
      });
    });
  });

  describe('#toNumber', () => {
    const categoryId = randomInRange(0, 15);
    const reasonId = randomInRange(0, 15);

    const decomposed = {
      category: CATEGORY[categoryId],
      reason: REASON[reasonId]
    };

    const code = toNumber(decomposed);

    it('is a number', () => expect(code).to.be.a('number'));
    it('is a single byte', () => expect(code).to.be.within(0, 255));

    it('places the nibbles side-by-side', () => {
      expect(code).to.equal(categoryId * 16 + reasonId);
    });

    context('invalid category', () => {
      const badCat = Object.assign(decomposed, { category: 'bad!' });
      it('throws', () => expect(() => toNumber(badCat)).to.throw(Error));
    });

    context('invalid reason', () => {
      const badReason = Object.assign(decomposed, { reason: 'bad!' });
      it('throws', () => expect(() => toNumber(badReason)).to.throw(Error));
    });
  });

  describe('#toHexString', () => {

  });

  // describe('#hexify');
});
