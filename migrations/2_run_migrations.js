/* eslint-disable no-undef */
const FISSION = artifacts.require('FISSION');
const LocalizationPreferences = artifacts.require('LocalizationPreferences');
const BasicEnglishLocalization = artifacts.require('BasicEnglishLocalization');
/* eslint-enable no-undef */

module.exports = async (deployer) => {
  await deployer.deploy(FISSION);
  const localization = await deployer.deploy(BasicEnglishLocalization);
  await deployer.deploy(LocalizationPreferences, localization.address);
};
