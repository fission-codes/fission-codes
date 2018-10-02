const { expect } = require('chai');

/* eslint-disable no-undef */
const Status = artifacts.require('Status');
const AgeValidator = artifacts.require('AgeValidator');
const FinancialValidator = artifacts.require('FinancialValidator');
const InsuranceValidator = artifacts.require('InsuranceValidator');
/* eslint-enable no-undef */

contract('Validators', async () => { // eslint-disable-line no-undef
  const status = await Status.new();
  const ageValidator = await AgeValidator.new();

  let isOk;
  let category;

  describe('AgeValidator', () => {
    let validAge;

    context('valid age', () => {
      before(async () => {
        validAge = await ageValidator.check(33);

        [isOk, category] = await Promise.all([
          status.isOk(validAge),
          status.categoryOf(validAge)
        ]);
      });

      it('is okay', async () => expect(isOk).to.be.true);
      it('has the `App` category', async () => expect(Number(category)).to.be.equal(10));
    });

    context('invalid age', () => {
      before(async () => {
        validAge = await ageValidator.check(10);

        [isOk, category] = await Promise.all([
          status.isOk(validAge),
          status.categoryOf(validAge)
        ]);
      });

      it('is not okay', async () => expect(isOk).to.be.false);
      it('has the `App` category', async () => expect(Number(category)).to.be.equal(10));
    });
  });

  describe('CombinedValidator', async () => {
    const financialValidator = await FinancialValidator.new();

    const insuranceValidator = await InsuranceValidator.new(
      financialValidator.address, ageValidator.address
    );

    let code;
    let trace;

    context('valid', () => {
      before(async () => {
        const { 0: c, 1: t } = await insuranceValidator.check(2000, 20);

        code = c;
        trace = t;
      });

      it('has the `App` category', async () => expect(Number(category)).to.be.equal(10));
      it('is okay', async () => expect(await status.isOk(code)).to.be.true);

      it('has the insurance validator address in the trace', () => {
        expect(trace).to.be.equal(insuranceValidator.address);
      });
    });

    context('invalid', async () => {
      before(async () => {
        const { 0: c, 1: t } = await insuranceValidator.check(100, 20);

        code = c;
        trace = t;

        [isOk, category] = await Promise.all([
          status.isOk(code),
          status.categoryOf(code)
        ]);
      });

      it('has the correct category', () => expect(Number(category)).to.be.equal(1));
      it('is not okay', () => expect(isOk).to.be.false);

      it('has the financial validator address in the trace', () => {
        expect(trace).to.be.equal(financialValidator.address);
      });
    });
  });
});
