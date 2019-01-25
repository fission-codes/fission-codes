/* eslint-disable no-undef */
const Migrations = artifacts.require('./Migrations.sol');

const FISSION = artifacts.require('FISSION.sol');
const AgeValidator = artifacts.require('examples/AgeValidator.sol');
const FinancialValidator = artifacts.require('examples/FinancialValidator.sol');
const InsuranceValidator = artifacts.require('examples/InsuranceValidator.sol');
const Phone = artifacts.require('examples/Phone.sol');
/* eslint-enable no-undef */

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(FISSION);

  deployer.link(FISSION, [
    AgeValidator,
    FinancialValidator,
    InsuranceValidator,
    Phone
  ]);
};
