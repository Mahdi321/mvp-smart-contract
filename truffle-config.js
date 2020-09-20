module.exports = {
    networks: {
      development: {
        host: "localhost",
        port: 8545,
            
        gas: 5721975000000,
        gasPrice: 1000000000,
        //gasLimit: 10000000000,
        //blockLimit: 10000000000,
        network_id: "*" // Match any network id
      }
    },
    compilers: {
    solc: {
        version: "0.4.23",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
}
  };
  