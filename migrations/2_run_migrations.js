/* eslint-disable no-undef */
const Status = artifacts.require('Status');
const LocalizationPreferences = artifacts.require('LocalizationPreferences');
const FissionLocalization = artifacts.require('FissionLocalization');
/* eslint-enable no-undef */

module.exports = async (deployer) => {
  await deployer.deploy(Status);
  const msgr = await deployer.deploy(FissionLocalization);
  await deployer.deploy(LocalizationPreferences, msgr.address);
};
