module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
      // gas: Number(4712388 * 1.1).toFixed(0) // increase the default limit of 4712388
      gas: 6712388
    }
  },
  mocha: {
    // reporter: 'eth-gas-reporter',
    growl: true
  }
};
