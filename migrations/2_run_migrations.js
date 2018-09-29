var Status = artifacts.require('Status');
var LocalizationPreferences = artifacts.require('LocalizationPreferences');
var FissionLocalization = artifacts.require('FissionLocalization');

module.exports = async (deployer) => {
  await deployer.deploy(Status);
  const msgr = await deployer.deploy(FissionLocalization);
  await deployer.deploy(LocalizationPreferences, FissionLocalization.address);
};
