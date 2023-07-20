import * as dotenv from "dotenv";
dotenv.config();

export const DEPLOYED_CONTRACT_ADDRESS =
  "0x7eBA289eF3a9ab2EbF10DdAb92dA72AD3B392D2A"; // needs to be repalced with the deployed contract address
process.env.EPLOYED_CONTRACT_ADDRESS || "";
export const CRONOS_EXPLORER_API_KEY = process.env.CRONOSCAN_API_KEY || "";
export const CRONOSCAN_API_KEY = process.env.CRONOSCAN_API_KEY || "";
export const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
export const COINMARKETCAP_API = process.env.COINMARKETCAP_API || "";
export const CRONOS_TESTNET_RPC = "https://evm-t3.cronos.org";
export const CRONOS_MAINNET_RPC = "https://evm.cronos.org/";
