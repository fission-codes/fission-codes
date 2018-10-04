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

  describe('#isOk', () => {
    context('lower nibble is 0x01', () => {
      it('is true', async () => {
        const result = await status.isOk('0x01');
        return expect(result).to.be.true;
      });

      it('is insensitive to the upper nibble', async () => {
        const result = await status.isOk('0x41');
        return expect(result).to.be.true;
      });
    });

    context('lower nibble is not 0x01', () => {
      it('is false', async () => {
        const result = await status.isOk('0x02');
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
