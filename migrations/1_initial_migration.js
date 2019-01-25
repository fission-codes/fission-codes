/* eslint-disable no-undef */
const Migrations = artifacts.require('./Migrations.sol');

const FISSION = artifacts.require('FISSION.sol');

const Phone = artifacts.require('examples/Phone.sol');
const Portfolio = artifacts.require('examples/Portfolio.sol');
const SimpleAuth = artifacts.require('examples/SimpleAuth.sol');
const AgeValidator = artifacts.require('examples/AgeValidator.sol');
const FinancialValidator = artifacts.require('examples/FinancialValidator.sol');
const InsuranceValidator = artifacts.require('examples/InsuranceValidator.sol');
/* eslint-enable no-undef */

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(FISSION);

  deployer.link(FISSION, [
    AgeValidator,
    FinancialValidator,
    InsuranceValidator,
    Phone,
    SimpleAuth,
    Portfolio
  ]);
};
