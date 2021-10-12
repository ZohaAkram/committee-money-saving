const Marketplace = artifacts.require("Committee");

module.exports = function(deployer) {
  deployer.deploy(Committee);
};
