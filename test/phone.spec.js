const { expect } = require('chai');

const Phone = artifacts.require('Phone'); // eslint-disable-line no-undef
const Status = artifacts.require('Status'); // eslint-disable-line no-undef

contract('Phone', async (addresses) => { // eslint-disable-line no-undef
  let status;
  let alice;
  let bob;

  let reason;
  let message;

  before(async () => {
    status = await Status.new();
    alice = await Phone.new();
    bob = await Phone.new();
  });

  describe('#incoming', () => {
    context('on contact list', () => {
      before(async () => {
        await alice.addContact(addresses[0]);
        const { 0: code, 1: msg } = await alice.incoming.call('Hey');

        message = msg;
        reason = await status.reasonOf(code);
      });

      it('starts the call', () => {
        expect(Number(reason)).to.equal(2);
      });

      it('returns a friendly message', () => {
        expect(message).to.equal('Hi. Can I help you?');
      });
    });

    context('not on contact list', () => {
      before(async () => {
        const { 0: code, 1: msg } = await bob.incoming.call('Hey');
        console.log(code);
        console.log(msg);

        message = msg;
        reason = await status.reasonOf(code);
      });

      it('goes to answering machine', () => {
        expect(Number(reason)).to.equal(4);
      });

      it('includes the asnwering machine message', () => {
        expect(message).to.equal('Your message has been recorded');
      });
    });
  });

  describe('#outgoing', () => {
    context('not on contact list', () => {
      before(async () => {
        const { 0: code, 1: msg } = await alice.outgoing.call(bob.address, 'hello');

        message = msg;
        reason = await status.reasonOf(code);
      });

      it('starts the call', () => {
        expect(Number(reason)).to.equal(0);
      });

      it('returns a friendly message', () => {
        expect(message).to.equal('click');
      });
    });

    context('on contact list', () => {
      before(async () => {
        await alice.addContact(alice.address);
        const { 0: code, 1: msg } = await alice.outgoing.call(alice.address, 'hello');

        message = msg;
        reason = await status.reasonOf(code);
      });


      it('starts the call', () => {
        expect(Number(reason)).to.equal(2);
      });

      it('returns a friendly message', () => {
        expect(message).to.equal('Hi. Can I help you?');
      });
    });
  });
});
