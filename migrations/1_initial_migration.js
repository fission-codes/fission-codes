/* eslint-disable no-undef */
const Migrations = artifacts.require('./Migrations.sol');

const Status = artifacts.require('./Status.sol');
const AgeValidator = artifacts.require('validators/AgeValidator.sol');
const FinancialValidator = artifacts.require('validators/FinancialValidator.sol');
const InsuranceValidator = artifacts.require('validators/InsuranceValidator.sol');
/* eslint-enable no-undef */

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Status);
  deployer.link(Status, [AgeValidator, FinancialValidator, InsuranceValidator]);
};
