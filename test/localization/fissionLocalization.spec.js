const { expect } = require('chai');

/* eslint-disable no-undef */
const FissionLocalization = artifacts.require('FissionLocalization');
/* eslint-enable no-undef */

contract('FissionLocalization', async () => { // eslint-disable-line no-undef
  let fissionLocalization;

  before(async () => {
    fissionLocalization = await FissionLocalization.new();
    await fissionLocalization.set('0x01', 'message');
  });

  describe('#log', () => {
    it('emits a FissionCode event', async () => {
      const tx = await fissionLocalization.log('0x01');

      expect(tx.logs[0].event).to.equal('FissionCode');
    });

    it('emits the correct message', async () => {
      const tx = await fissionLocalization.log('0x01');

      expect(tx.logs[0].args[1]).to.equal('message');
    });
  });
});
