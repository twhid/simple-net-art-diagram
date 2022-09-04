module.exports = {
    networks: {
        dashboard: {
            host: "localhost",
            port: 24012,
            network_id: "*", // any network
            networkCheckTimeout: 30 * 60 * 10000, // very high timeout to ensure txn finishess
        },
    },
};
