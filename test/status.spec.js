const { expect } = require('chai');
const { expectRevert } = require('./helpers');

/* eslint-disable no-undef */
const Status = artifacts.require('Status');
const LocalizationPreferences = artifacts.require('LocalizationPreferences');
const BasicEnglishLocalization = artifacts.require('BasicEnglishLocalization');
/* eslint-enable no-undef */

contract('Status', () => { // eslint-disable-line no-undef
  let status;

  before(async () => {
    status = await Status.new();
  });

  // describe('#toCode', () => {
  //   it('constructs a code out of numbers', async () => {
  //     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>");
  //     const code = await status.toCode(10, 6);
  //     console.log("***************************");
  //     expect(Number(code)).to.equal(0xA6);
  //   });
  // });

  describe('#appCode', () => {
    it('prepends "A" to the reason', async () => {
      const code = await status.appCode('0x06');
      expect(Number(code)).to.equal(0xA6);
    });
  });

  describe('#categoryOf', () => {
    it('retuns the upper nibble', async () => {
      const cat = await status.categoryOf('0x01');
      expect(Number(cat)).to.equal(0);
    });

    it('retuns nibbles above 9', async () => {
      const cat = await status.categoryOf('0xA6');
      expect(Number(cat)).to.equal(10);
    });
  });

  describe('#reasonOf', () => {
    it('retuns the upper nibble', async () => {
      const cat = await status.reasonOf('0x01');
      expect(Number(cat)).to.equal(1);
    });

    it('retuns nibbles above 9', async () => {
      const cat = await status.reasonOf('0x3B');
      expect(Number(cat)).to.equal(11);
    });
  });

  // describe('#localizeBy', () => {
  //   it('looks up a translation', async () => {
  //     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>");
  //     const code = await status.toCode(10, 6);
  //     console.log("***************************");
  //     expect(Number(code)).to.equal(0xA6);
  //   });
  // });

  describe('#isOk', () => {
    context('lower nibble is odd', () => {
      it('is true', async () => {
        const result = await status.isOk('0x05');
        return expect(result).to.be.true;
      });

      it('is insensitive to the upper nibble', async () => {
        const result = await status.isOk('0x41');
        return expect(result).to.be.true;
      });
    });

    context('lower nibble is even', () => {
      it('is false', async () => {
        const result = await status.isOk('0x0A');
        return expect(result).to.be.false;
      });
    });
  });

  describe('#isBlocking', () => {
    context('lower nibble is even', () => {
      it('is blocking', async () => {
        const result = await status.isBlocking('0x14');
        return expect(result).to.be.true;
      });
    });

    context('lower nibble is odd', () => {
      it('is not blocking', async () => {
        const result = await status.isBlocking('0xE7');
        return expect(result).to.be.false;
      });
    });
  });

  describe('#isSuccess', () => {
    context('lower nibble is 1', () => {
      it('is blocking', async () => {
        const result = await status.isSuccess('0xD1');
        return expect(result).to.be.true;
      });

      it('is insensitive to the upper nibble', async () => {
        const result = await status.isSuccess('0x41');
        return expect(result).to.be.true;
      });
    });

    context('lower nibble is not 1', () => {
      it('is not blocking', async () => {
        const result = await status.isSuccess('0xE7');
        return expect(result).to.be.false;
      });
    });
  });

  describe('#isFailure', () => {
    context('lower nibble is 0x00', () => {
      it('is true', async () => {
        const result = await status.isFailure('0x00');
        return expect(result).to.be.true;
      });

      it('is insensitive to the upper nibble', async () => {
        const result = await status.isFailure('0x40');
        return expect(result).to.be.true;
      });
    });

    context('lower nibble is not 0x00', () => {
      it('is false', async () => {
        const result = await status.isFailure('0x02');
        return expect(result).to.be.false;
      });
    });
  });

  describe('#requireOk/2', () => {
    let localization;
    let registry;

    before(async () => {
      localization = await BasicEnglishLocalization.new();
      registry = await LocalizationPreferences.new(localization.address);

      await registry.set(localization.address);
    });

    context('lower nibble is 0x01', () => {
      it('does not throw', async () => {
        const result = await status.requireOk('0x01', registry);
        return expect(result).to.be.ok;
      });
    });

    context('lower nibble is not 0x01', () => {
      it('reverts with message', () => expectRevert(async () => {
        await status.requireOk('0x00', registry);
      }));
    });
  });
});
