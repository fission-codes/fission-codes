const { expect } = require('chai');
const { expectRevert } = require('../helpers');

/* eslint-disable no-undef */
const Status = artifacts.require('Status');
const LocalizationPreferences = artifacts.require('LocalizationPreferences');
const BasicEnglishLocalization = artifacts.require('BasicEnglishLocalization');
/* eslint-enable no-undef */

contract('Status', () => { // eslint-disable-line no-undef
  let status;
  let localization;
  let registry;

  before(async () => {
    status = await Status.new();

    localization = await BasicEnglishLocalization.new();
    registry = await LocalizationPreferences.new(localization.address);
  });

  // Having issues with overloaded functions
  //
  // describe('#toCode', () => {
  //   it('constructs a code out of numbers', async () => {
  //     const code = await status.toCode(10, 6);
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

  // Having issues with overloaded functions
  //
  // describe('#localizeBy', () => {
  //   it('looks up a translation', async () => {
  //     const [found, text] = await status.localizeBy('0x14', registry.address);
  //     expect(text).to.equal('');
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
    context('lower nibble is odd', () => {
      it('does not throw on 0x01', async () => {
        const result = await status.requireOk('0x01', registry);
        return expect(result).to.be.ok;
      });

      it('does not throw on 0xA5', async () => {
        const result = await status.requireOk('0xA5', registry);
        return expect(result).to.be.ok;
      });
    });

    context('lower nibble is even', () => {
      it('reverts with message on 0x00', () => expectRevert(async () => {
        await status.requireOk('0x00', registry);
      }));

      it('reverts with message on 0xA2', () => expectRevert(async () => {
        await status.requireOk('0xA2', registry);
      }));
    });
  });

  describe('#requireSuccess/2', () => {
    context('lower nibble is 1', () => {
      it('does not throw', async () => {
        const result = await status.requireSuccess('0x01', registry);
        return expect(result).to.be.ok;
      });
    });

    context('lower nibble is not 1', () => {
      it('reverts with message', () => expectRevert(async () => {
        await status.requireSuccess('0x00', registry);
      }));
    });
  });
});
