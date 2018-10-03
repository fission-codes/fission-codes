const { expect } = require('chai');

/* eslint-disable no-undef */
const FissionLocalization = artifacts.require('FissionLocalization');
/* eslint-enable no-undef */

contract('FissionLocalization', async () => { // eslint-disable-line no-undef
  let fissionLocalizationInstance;

  before(async () => {
    fissionLocalizationInstance = await FissionLocalization.new();
    await fissionLocalizationInstance.set('0x01', 'message');
  });

  describe('#log', () => {
    it('emits a FissionCode event', async () => {
      const tx = await fissionLocalizationInstance.log('0x01');

      expect(tx.logs[0].event).to.equal('FissionCode');
    });

    it('emits the correct message', async () => {
      const tx = await fissionLocalizationInstance.log('0x01');

      expect(tx.logs[0].args[1]).to.equal('message');
    });
  });
});
