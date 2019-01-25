const { expect } = require('chai');

/* eslint-disable no-undef */
const FISSION = artifacts.require('FISSION');
const AgeValidator = artifacts.require('AgeValidator');
const FinancialValidator = artifacts.require('FinancialValidator');
const InsuranceValidator = artifacts.require('InsuranceValidator');
/* eslint-enable no-undef */

contract('Validators', async () => { // eslint-disable-line no-undef
  let fission;
  let ageValidator;

  let isOk;
  let category;

  before(async () => {
    fission = await FISSION.new();
    ageValidator = await AgeValidator.new();
  });

  describe('AgeValidator', () => {
    let validAge;

    context('valid age', () => {
      before(async () => {
        validAge = await ageValidator.check(33);

        [isOk, category] = await Promise.all([
          fission.isOk(validAge),
          fission.categoryOf(validAge)
        ]);
      });

      it('is okay', async () => expect(isOk).to.be.true);
      it('has the `App` category', async () => expect(Number(category)).to.be.equal(10));
    });

    context('invalid age', () => {
      before(async () => {
        validAge = await ageValidator.check(10);

        [isOk, category] = await Promise.all([
          fission.isOk(validAge),
          fission.categoryOf(validAge)
        ]);
      });

      it('is not okay', async () => expect(isOk).to.be.false);
      it('has the `App` category', async () => expect(Number(category)).to.be.equal(10));
    });
  });

  describe('CombinedValidator', async () => {
    let financialValidator;
    let insuranceValidator;

    let code;
    let trace;

    before(async () => {
      financialValidator = await FinancialValidator.new();

      insuranceValidator = await InsuranceValidator.new(
        financialValidator.address, ageValidator.address
      );
    });

    context('valid', () => {
      before(async () => {
        const { 0: c, 1: t } = await insuranceValidator.check(2000, 20);

        code = c;
        trace = t;
      });

      it('has the `App` category', async () => expect(Number(category)).to.be.equal(10));
      it('is okay', async () => expect(await fission.isOk(code)).to.be.true);

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
          fission.isOk(code),
          fission.categoryOf(code)
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
