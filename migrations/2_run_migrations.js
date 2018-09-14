var Status = artifacts.require('Status');
var LocalizationPrefs = artifacts.require('LocalizationPrefs');
var StatusCodeLocalization = artifacts.require('StatusCodeLocalization');

module.exports = async (deployer) => {
  await deployer.deploy(Status);
  const msgr = await deployer.deploy(StatusCodeLocalization);
    await deployer.deploy(LocalizationPrefs, StatusCodeLocalization.address);
};
