const counter =artifacts.require('../contracts/Counter.sol');

module.exports = function(deployer) {
            deployer.deploy(counter); 
}
