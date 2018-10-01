const { expect } = require('chai');

const Phone = artifacts.require('Phone'); // eslint-disable-line no-undef
const Status = artifacts.require('Status'); // eslint-disable-line no-undef

contract('Phone', async (addresses) => { // eslint-disable-line no-undef
  const status = await Status.new();
  const alice = await Phone.new();
  const bob = await Phone.new();

  let reason;
  let message;

  describe('#incoming', () => {
    context('on contact list', () => {
      before(async () => {
        await alice.addContact(addresses[0]);
        const result = await alice.incoming.call('Hey');

        message = result[1];
        reason = await status.reasonOf(result[0]);
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
        const result = await bob.incoming.call('Hey');

        message = result[1];
        reason = await status.reasonOf(result[0]);
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
        const result = await alice.outgoing.call(bob.address, 'hello');

        message = result[1];
        reason = await status.reasonOf(result[0]);
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
        const result = await alice.outgoing.call(alice.address, 'hello');

        message = result[1];
        reason = await status.reasonOf(result[0]);
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
