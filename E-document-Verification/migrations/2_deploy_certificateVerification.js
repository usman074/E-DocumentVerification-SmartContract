const certificateVerification = artifacts.require("certificateVerification");

module.exports = async function(deployer) {
  await deployer.deploy(certificateVerification);
};
