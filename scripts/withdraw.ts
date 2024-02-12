import { ethers } from 'hardhat';
import { abi as _abi } from '../artifacts/contracts/TipCreator.sol/TipCreator.json';
import { BigNumber, Contract, Wallet } from 'ethers';
import { DEPLOYED_CONTRACT_ADDRESS, PRIVATE_KEY, testnet } from '../constants';

/**
 * Provides functionalities for simulating Ethereum blockchain interactions,
 * including fetching and printing Ether balances, printing stored comments, and running a full simulation
 */
const withdraw = {
  /**
   * Retrieves the Ether balance of a specified address and returns it as a string.
   * This function queries the balance using the ethers provider and formats it to a human-readable string.
   *
   * @param {string} address - The Ethereum address to query the balance for.
   * @returns {Promise<string>} - A promise that resolves with the balance of the specified address in Ether,
   *                              formatted as a string. If an error occurs, it returns '0'.
   */
  async getBalance(
    provider: { getBalance: (arg0: string) => Promise<BigNumber> },
    address: string
  ): Promise<string> {
    try {
      const balanceBigInt: BigNumber = await provider.getBalance(address);
      const balanceString: string = ethers.utils.formatEther(balanceBigInt);
      return balanceString;
    } catch (e) {
      console.log(e);
      return '0';
    }
  },

  /**
   * Main function to run the simulation. This includes deploying the TipCreator contract, simulating tip transactions,
   * withdrawing tips, and printing the contract's stored comments.
   * This function showcases a typical interaction sequence with the TipCreator contract.
   *
   * @returns {Promise<void>} - A promise that resolves once the simulation has completed.
   *                            If an error occurs during the simulation, the promise rejects with the error.
   */
  async main(): Promise<void> {
    try {
      const contractAddress: string = DEPLOYED_CONTRACT_ADDRESS;
      const contractABI = _abi;
      const provider = new ethers.providers.JsonRpcProvider(
        testnet.CRONOS_TESTNET_RPC
      );
      const signer: Wallet = new ethers.Wallet(PRIVATE_KEY, provider);
      const tipCreator: Contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      console.log(
        'current balance of owner: ',
        await withdraw.getBalance(provider, signer.address),
        'ETH'
      );
      const contractBalance = await withdraw.getBalance(
        provider,
        tipCreator.address
      );
      console.log(
        'current balance of contract: ',
        await withdraw.getBalance(provider, tipCreator.address),
        'ETH'
      );

      if (contractBalance !== '0.0') {
        console.log('withdrawing funds..');
        const withdrawTxn = await tipCreator.withdrawTips();
        await withdrawTxn.wait();
      } else {
        console.log('no funds to withdraw!');
      }

      console.log(
        'current balance of owner: ',
        await withdraw.getBalance(provider, signer.address),
        'ETH'
      );
    } catch (e) {
      console.log(e);
    }
  },
};

withdraw
  .main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
