const { expect } = require('chai');

const { randomInRange } = require('../helpers');

const {
  CATEGORIES,
  CATEGORY_NAMES,
  REASONS,
  REASON_NAMES,
  categoryOf,
  categoryIdOf,
  combine,
  dehumanize,
  hexifyCode,
  humanize,
  reasonOf,
  reasonIdOf,
  split,
  toHexString,
  toNumber
} = require('../../lib/fission');

const hexFormat = /0x[0-9A-F]{2}/;

describe('fission.js', () => {
  const categoryId = randomInRange(0x0, 0xF);
  const reasonId = randomInRange(0x0, 0xF);

  const decomposed = {categoryId, reasonId};
  const code = combine(decomposed);

  const names = {
    category: CATEGORY_NAMES[categoryId],
    reason: REASON_NAMES[reasonId]
  };

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
    it('has the correct keys', () => {
      expect(decomposed).to.have.all.keys('categoryId', 'reasonId');
    });

    describe('categoryId', () => {
      it('is a single hex number', () => {
        expect(categoryId).to.be.within(0, 15);
      });
    });

    describe('reasonId', () => {
      it('is a single hex number', () => {
        expect(reasonId).to.be.within(0, 15);
      });
    });
  });

  describe('projections', () => {
    describe('reason', () => {
      describe('#reasonOf', () => {
        it('extracts the reason\'s name', () => {
          expect(reasonOf(code)).to.equal(REASON_NAMES[reasonId]);
        });
      });

      describe('#reasonIdOf', () => {
        it('extracts the reason nibble', () => {
          expect(reasonIdOf(code)).to.equal(reasonId);
        });
      });
    });

    describe('category', () => {
      describe('#categoryOf', () => {
        it('extracts the category\'s name', () => {
          expect(categoryOf(code)).to.equal(CATEGORY_NAMES[categoryId]);
        });
      });

      describe('#categoryIdOf', () => {
        it('extracts the reason nibble', () => {
          expect(categoryIdOf(code)).to.equal(categoryId);
        });
      });
    });
  });

  describe('#humanize', () => {
    const humanized = humanize(decomposed);

    it('has a category string', () => {
      expect(humanized).to.include.all.keys('category', 'reason');
    });

    describe('category', () => {
      const { category } = humanized;

      it('is a string', () => {
        expect(category).to.be.a('string');
      });

      it('is the corresponding category enum', () => {
        expect(category).to.equal(CATEGORY_NAMES[categoryId]);
      });
    });

    describe('reason', () => {
      const { reason } = humanized;

      it('is a string', () => expect(reason).to.be.a('string'));

      it('is the corresponding reason enum', () => {
        expect(reason).to.equal(REASON_NAMES[reasonId]);
      });
    });
  });

  describe('#dehumanize', () => {
    const humanized = humanize(decomposed);
    const {category, reason} = humanized;

    const dehumanized = dehumanize(humanize(decomposed));
    const {categoryId, reasonId} = dehumanized;

    it('has a category string', () => {
      expect(dehumanized).to.include.all.keys('categoryId', 'reasonId');
    });

    describe('categoryId', () => {
      it('is a number', () => {
        expect(categoryId).to.be.a('number');
      });

      it('is the corresponding category ID', () => {
        expect(categoryId).to.equal(CATEGORIES[category]);
      });
    });

    describe('reason', () => {
      it('is a number', () => expect(reasonId).to.be.a('number'));

      it('is the corresponding reason enum', () => {
        expect(reasonId).to.equal(REASONS[reason]);
      });
    });
  });

  describe('#toNumber', () => {
    it('is a number', () => expect(code).to.be.a('number'));
    it('is a single byte', () => expect(code).to.be.within(0x00, 0xFF));

    it('places the nibbles side-by-side', () => {
      expect(code).to.equal(categoryId * 0x10 + reasonId);
    });

    context('invalid category', () => {
      const badCat = Object.assign({}, names, { category: 'bad!' });
      it('throws', () => expect(() => toNumber(badCat)).to.throw(Error));
    });

    context('invalid reason', () => {
      const badReason = Object.assign({}, names, { reason: 'bad!' });
      it('throws', () => expect(() => toNumber(badReason)).to.throw(Error));
    });
  });

  describe('#toHexString', () => {
    it('formats correctly', () => {
      expect(toHexString(decomposed)).to.match(hexFormat);
    });

    context('invalid category', () => {
      const badCat = Object.assign({}, names, { category: 'bad!' });
      it('throws', () => expect(() => toHexString(badCat)).to.throw(Error));
    });

    context('invalid reason', () => {
      const badReason = Object.assign({}, names, { reason: 'bad!' });
      it('throws', () => expect(() => toHexString(badReason)).to.throw(Error));
    });
  });

  describe('#hexifyCode', () => {
    it('formats correctly', () => {
      expect(hexifyCode(code)).to.match(hexFormat);
    });

    context('negative code', () => {
      it('throws', () => expect(() => hexifyCode(-1)).to.throw(RangeError));
    });

    context('code above 0xFF', () => {
      it('throws', () => expect(() => hexifyCode(256)).to.throw(RangeError));
    });

    context('decimal', () => {
      it('throws', () => {
        expect(() => hexifyCode(-1)).to.throw(RangeError);
      });
    });

    context('non-numeric', () => {
      it('throws', () => {
        expect(() => hexifyCode(true)).to.throw(TypeError);
      });

      it('throws', () => {
        expect(() => hexifyCode('3')).to.throw(TypeError);
      });
    });
  });
});
