import '@nomiclabs/hardhat-waffle';
import 'hardhat-gas-reporter';
import '@nomiclabs/hardhat-etherscan';
import {
  COINMARKETCAP_API,
  CRONOSCAN_API_KEY,
  CRONOS_MAINNET_RPC,
  CRONOS_TESTNET_RPC,
  PRIVATE_KEY,
} from './constants';

const config = {
  networks: {
    cronosTestnet: {
      url: CRONOS_TESTNET_RPC,
      chainId: 338,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      gasPrice: 'auto',
    },
    cronos: {
      url: CRONOS_MAINNET_RPC,
      chainId: 25,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      gasPrice: 'auto',
    },
  },
  etherscan: {
    apiKey: {
      cronosTestnet: CRONOSCAN_API_KEY,
      cronos: CRONOSCAN_API_KEY,
    },
    customChains: [
      {
        network: 'cronosTestnet',
        chainId: 338,
        urls: {
          apiURL: 'https://cronos.org/explorer/testnet3/api',
          browserURL: 'https://cronos.org/explorer/testnet3/',
        },
      },
      {
        network: 'cronos',
        chainId: 25,
        urls: {
          apiURL: 'https://api.cronoscan.com/api',
          browserURL: 'https://cronoscan.com',
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
