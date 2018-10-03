/* eslint-disable no-undef */
const Status = artifacts.require('Status');
const LocalizationPreferences = artifacts.require('LocalizationPreferences');
const BasicEnglishLocalization = artifacts.require('BasicEnglishLocalization');
/* eslint-enable no-undef */

module.exports = async (deployer) => {
  await deployer.deploy(Status);
  const localization = await deployer.deploy(BasicEnglishLocalization);
  await deployer.deploy(LocalizationPreferences, localization.address);
};
