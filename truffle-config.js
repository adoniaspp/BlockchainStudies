module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "192.168.100.3",
      port: 8545,
      network_id: "*" // Match any network id
    },
    develop: {
      port: 8545
    },
  },
  compilers: {
    solc: {
      version: "0.8.0"
    }
  }
};
