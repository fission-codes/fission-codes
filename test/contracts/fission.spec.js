const { expect } = require('chai');
const { expectRevert } = require('../helpers');
const fissionJS = require('../../lib/fission');

/* eslint-disable no-undef */
const FISSION = artifacts.require('FISSION');
const LocalizationPreferences = artifacts.require('LocalizationPreferences');
const BasicEnglishLocalization = artifacts.require('BasicEnglishLocalization');
/* eslint-enable no-undef */

contract('fission', () => { // eslint-disable-line no-undef
  let fission;
  let localization;
  let registry;

  before(async () => {
    fission = await FISSION.new();

    localization = await BasicEnglishLocalization.new();
    registry = await LocalizationPreferences.new(localization.address);
  });

  describe('#code', () => {
    describe('#code(bytes1,bytes1)', () => {
      it('constructs a code out of numbers', async () => {
        const code = await fission.methods['code(bytes1,bytes1)']('0x0A', '0x06');
        expect(Number(code)).to.equal(0xA6);
      });
    });

    describe('#code(uint8,uint8)', () => {
      it('constructs a code out of numbers', async () => {
        const code = await fission.methods['code(uint8,uint8)'](10, 6);
        expect(Number(code)).to.equal(0xA6);
      });
    });

    // FIXME: Truffle seems to be struggling with enums in any representation
    //
    // describe('#code(Status)', () => {
    //   it('constructs a code out of a Status enum', async () => {
    //     const code = await fission.methods['code(FISSION.Status)'].call(0x08);
    //     console.log(JSON.stringify(code));
    //     expect(Number(code)).to.equal(0x08);
    //   });
    // });

    // describe('#code(Category,Reason)', () => {
    //   it('constructs a code out of Category and Reason enums', async () => {
    //     const code = await fission.methods['code(FISSION.Category,FISSION.Reason)'](
    //       fissionJS.CATEGORIES.FIND,
    //       fissionJS.REASONS.UPPER_LIMIT
    //     );

    //     expect(Number(code)).to.equal(0x26);
    //   });
    // });
  });

  describe('#appCode', () => {
    it('prepends "A" to the reason', async () => {
      const code = await fission.appCode('0x06');
      expect(Number(code)).to.equal(0xA6);
    });
  });

  describe('#categoryOf', () => {
    it('retuns the upper nibble', async () => {
      const cat = await fission.categoryOf('0x01');
      expect(Number(cat)).to.equal(0);
    });

    it('retuns nibbles above 9', async () => {
      const cat = await fission.categoryOf('0xA6');
      expect(Number(cat)).to.equal(10);
    });
  });

  describe('#reasonOf', () => {
    describe('#reasonOf(bytes1)', () => {
      it('retuns the upper nibble', async () => {
        const cat = await fission.methods['reasonOf(bytes1)']('0x01');
        expect(Number(cat)).to.equal(1);
      });

      it('retuns nibbles above 9', async () => {
        const cat = await fission.methods['reasonOf(bytes1)']('0x3B');
        expect(Number(cat)).to.equal(11);
      });
    });

    // FIXME: Truffle seems to be struggling with enums in any representation
    //
    // describe('#reasonOf(Status)', () => {
    //   it('retuns the upper nibble', async () => {
    //     const cat = await fission.methods['reasonOf(FISSION.Status)'](fissionJS.STATUSES.SUCCESS);
    //     expect(Number(cat)).to.equal(1);
    //   });

    //   it('retuns nibbles above 9', async () => {
    //     const cat = await fission.methods['reasonOf(uint8)'](fissionJS.STATUSES.ALLOWED_GO);
    //     expect(Number(cat)).to.equal(11);
    //   });
    // });
  });

  describe('#isOk', () => {
    context('lower nibble is odd', () => {
      it('is true', async () => {
        const result = await fission.isOk('0x05');
        return expect(result).to.be.true;
      });

      it('is insensitive to the upper nibble', async () => {
        const result = await fission.isOk('0x41');
        return expect(result).to.be.true;
      });
    });

    context('lower nibble is even', () => {
      it('is false', async () => {
        const result = await fission.isOk('0x0A');
        return expect(result).to.be.false;
      });
    });
  });

  describe('#isBlocking', () => {
    context('lower nibble is even', () => {
      it('is blocking', async () => {
        const result = await fission.isBlocking('0x14');
        return expect(result).to.be.true;
      });
    });

    context('lower nibble is odd', () => {
      it('is not blocking', async () => {
        const result = await fission.isBlocking('0xE7');
        return expect(result).to.be.false;
      });
    });
  });

  describe('#isSuccess', () => {
    context('lower nibble is 1', () => {
      it('is blocking', async () => {
        const result = await fission.isSuccess('0xD1');
        return expect(result).to.be.true;
      });

      it('is insensitive to the upper nibble', async () => {
        const result = await fission.isSuccess('0x41');
        return expect(result).to.be.true;
      });
    });

    context('lower nibble is not 1', () => {
      it('is not blocking', async () => {
        const result = await fission.isSuccess('0xE7');
        return expect(result).to.be.false;
      });
    });
  });

  describe('#isFailure', () => {
    context('lower nibble is 0x00', () => {
      it('is true', async () => {
        const result = await fission.isFailure('0x00');
        return expect(result).to.be.true;
      });

      it('is insensitive to the upper nibble', async () => {
        const result = await fission.isFailure('0x40');
        return expect(result).to.be.true;
      });
    });

    context('lower nibble is not 0x00', () => {
      it('is false', async () => {
        const result = await fission.isFailure('0x02');
        return expect(result).to.be.false;
      });
    });
  });

  describe('#requireOk/2', () => {
    context('lower nibble is odd', () => {
      it('does not throw on 0x01', async () => {
        const result = await fission.requireOk('0x01', registry);
        return expect(result).to.be.ok;
      });

      it('does not throw on 0xA5', async () => {
        const result = await fission.requireOk('0xA5', registry);
        return expect(result).to.be.ok;
      });
    });

    context('lower nibble is even', () => {
      it('reverts with message on 0x00', () => expectRevert(async () => {
        await fission.requireOk('0x00', registry);
      }));

      it('reverts with message on 0xA2', () => expectRevert(async () => {
        await fission.requireOk('0xA2', registry);
      }));
    });
  });

  describe('#requireSuccess/2', () => {
    context('lower nibble is 1', () => {
      it('does not throw', async () => {
        const result = await fission.requireSuccess('0x01', registry);
        return expect(result).to.be.ok;
      });
    });

    context('lower nibble is not 1', () => {
      it('reverts with message', () => expectRevert(async () => {
        await fission.requireSuccess('0x00', registry);
      }));
    });
  });
});
