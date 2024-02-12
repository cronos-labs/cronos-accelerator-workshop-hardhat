import * as dotenv from 'dotenv';
dotenv.config();

// API Keys
export const PRIVATE_KEY = process.env.PRIVATE_KEY!;
export const COINMARKETCAP_API = process.env.COINMARKETCAP_API;
export const EXPLORER_MAINNET_API_KEY = process.env.EXPLORER_MAINNET_API_KEY!;
export const EXPLORER_TESTNET_API_KEY = process.env.EXPLORER_TESTNET_API_KEY!;

// Mainnet configuration variables
export const mainnet = {
  EXPLORER_MAINNET_API_KEY: process.env.EXPLORER_MAINNET_API_KEY!,
  CRONOS_MAINNET_RPC: 'https://evm.cronos.org/',
  EXPLORER_MAINNET_URL: 'https://explorer.cronos.org',
  EXPLORER_MAINNET_API_URL: `https://explorer-api.cronos.org/mainnet/api/v1/hardhat/contract?apikey=${EXPLORER_MAINNET_API_KEY}`,
};

// Testnet configuration variables
export const testnet = {
  EXPLORER_TESTNET_API_KEY: process.env.EXPLORER_TESTNET_API_KEY!,
  CRONOS_TESTNET_RPC: 'https://evm-t3.cronos.org',
  EXPLORER_TESTNET_URL: 'https://explorer.cronos.org/testnet',
  EXPLORER_TESTNET_API_URL: `https://explorer-api.cronos.org/testnet/api/v1/hardhat/contract?apikey=${EXPLORER_TESTNET_API_KEY}`,
};

// Misc
export const DEPLOYED_CONTRACT_ADDRESS = process.env.DEPLOYED_CONTRACT_ADDRESS!;
