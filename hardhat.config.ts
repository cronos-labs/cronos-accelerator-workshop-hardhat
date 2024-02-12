import '@nomiclabs/hardhat-waffle';
import 'hardhat-gas-reporter';
import '@nomiclabs/hardhat-etherscan';
import { COINMARKETCAP_API, mainnet, testnet, PRIVATE_KEY } from './constants';

const config = {
  networks: {
    cronosTestnet: {
      url: testnet.CRONOS_TESTNET_RPC,
      chainId: 338,
      accounts: [PRIVATE_KEY],
      gasPrice: 'auto',
    },
    cronos: {
      url: mainnet.CRONOS_MAINNET_RPC,
      chainId: 25,
      accounts: [PRIVATE_KEY],
      gasPrice: 'auto',
    },
  },
  etherscan: {
    apiKey: {
      cronosTestnet: testnet.EXPLORER_TESTNET_API_KEY,
      cronos: mainnet.EXPLORER_MAINNET_API_KEY,
    },
    customChains: [
      {
        network: 'cronos',
        chainId: 25,
        urls: {
          apiURL: mainnet.EXPLORER_MAINNET_API_URL,
          browserURL: mainnet.EXPLORER_MAINNET_URL,
        },
      },
      {
        network: 'cronosTestnet',
        chainId: 338,
        urls: {
          apiURL: testnet.EXPLORER_TESTNET_API_URL,
          browserURL: testnet.EXPLORER_TESTNET_URL,
        },
      },
    ],
  },
  solidity: {
    version: '0.8.3',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 5000, // In GWei
    coinmarketcap: COINMARKETCAP_API,
  },
};

export default config;
