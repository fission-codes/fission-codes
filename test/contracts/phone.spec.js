const { expect } = require('chai');
const fissionJS = require('../../lib/fission');

const Phone = artifacts.require('Phone'); // eslint-disable-line no-undef
const FISSION = artifacts.require('FISSION'); // eslint-disable-line no-undef

contract('Phone', async (addresses) => { // eslint-disable-line no-undef
  let fission;
  let alice;
  let bob;

  let reason;
  let message;

  before(async () => {
    fission = await FISSION.new();
    alice = await Phone.new();
    bob = await Phone.new();
  });

  describe('#incoming', () => {
    context('on contact list', () => {
      before(async () => {
        await alice.addContact(addresses[0]);
        const { 0: code, 1: msg } = await alice.incoming.call('Hey');

        message = msg;
        reason = fissionJS.reasonIdOf(Number(code));
      });

      it('starts the call', () => {
        expect(reason).to.equal(1);
      });

      it('returns a friendly message', () => {
        expect(message).to.equal('Hi. Can I help you?');
      });
    });

    context('not on contact list', () => {
      before(async () => {
        const { 0: code, 1: msg } = await bob.incoming.call('Hey');

        message = msg;
        reason = fissionJS.reasonIdOf(Number(code));
      });

      it('goes to voicemail', () => {
        expect(reason).to.equal(2);
      });

      it('includes the voicemail message', () => {
        expect(message).to.equal('Your message has been recorded');
      });
    });
  });

  describe('#outgoing', () => {
    context('not on contact list', () => {
      before(async () => {
        const { 0: code, 1: msg } = await alice.outgoing.call(bob.address, 'hello');

        message = msg;
        reason = fissionJS.reasonIdOf(Number(code));
      });

      it('does not start the call', () => {
        expect(reason).to.equal(0);
      });

      it('records a message', () => {
        expect(message).to.equal('click');
      });
    });

    context('on contact list', () => {
      before(async () => {
        await alice.addContact(alice.address);
        const { 0: code, 1: msg } = await alice.outgoing.call(alice.address, 'hello');

        message = msg;
        reason = fissionJS.reasonIdOf(Number(code));
      });

      it('starts the call', () => {
        expect(reason).to.equal(1);
      });

      it('returns a friendly message', () => {
        expect(message).to.equal('Hi. Can I help you?');
      });
    });
  });
});
