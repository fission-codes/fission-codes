/* eslint-disable no-undef */
const Migrations = artifacts.require('./Migrations.sol');

const Status = artifacts.require('Status.sol');
const AgeValidator = artifacts.require('examples/AgeValidator.sol');
const FinancialValidator = artifacts.require('examples/FinancialValidator.sol');
const InsuranceValidator = artifacts.require('examples/InsuranceValidator.sol');
const Phone = artifacts.require('examples/Phone.sol');
/* eslint-enable no-undef */

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Status);

  deployer.link(Status, [
    AgeValidator,
    FinancialValidator,
    InsuranceValidator,
    Phone
  ]);
};
