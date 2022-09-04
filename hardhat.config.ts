import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";

dotenv.config();

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.13",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1348,
            },
        },
    },
    networks: {
        // truffle dashboard https://trufflesuite.com/docs/truffle/getting-started/using-the-truffle-dashboard.html
        "truffle-dashboard": {
            url: `http://localhost:24012/rpc`,
            timeout: 30 * 60 * 10000, // very high timeout to ensure txn finishes
        },
        goerli: {
            url: process.env.GOERLI_URL,
        },
        rinkeby: {
            url: process.env.RINKEBY_URL,
        },
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    typechain: {
        outDir: "types",
    },
};

export default config;
