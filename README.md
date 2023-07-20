# Seoul Web 3.0 Festival - Workshop - Hardhat

This repo contains a contract that implements tipping functionality.

Install dependencies with `npm install`.

Set up by creating a `.env` file, and filling out these variables:

```
PRIVATE_KEY="your_private_key"
CRONOSCAN_TESTNET_API_KEY="your_cronoscan_testnet_api_key"
COINMARKETCAP_API="your_cointmarketcap_api_key"
```

## Be very careful with exporting your private key

You can get your Private Key from MetaMask [like this](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).
If you have any questions or concerns about this, please find someone you trust to sanity check you!

## Be very careful with exporting your private key

Deploy your contract with:

```
npx hardhat run scripts/deploy.ts --network cronosTestnet
```

Run a tipping simulation locally with:

```
npx hardhat run scripts/tipSimulation.ts
```

Once you have a contract deployed to Cronos testnet, grab the contract address and update the `DEPLOYED_CONTRACT_ADDRESS` variable in `constants.ts`, then:

```
npx hardhat run scripts/withdraw.js
```

will allow you to withdraw any tips stored on the contract.
