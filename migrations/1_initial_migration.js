const Migrations = artifacts.require('./Migrations.sol'); // eslint-disable-line no-undef

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
