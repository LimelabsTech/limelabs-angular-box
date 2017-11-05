module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*" // Match any network id
        }
    },
    solc: {
        // Turns on the Solidity optimizer. For smart contract auditing, be
        // sure to turn this off. For more information, see the Truffle 4.0.0
        // release notes.
        //
        // https://github.com/trufflesuite/truffle/releases/tag/v4.0.0
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
};
