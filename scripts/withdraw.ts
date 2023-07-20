import { ethers } from 'hardhat';
import { abi as _abi } from '../artifacts/contracts/TipCreator.sol/TipCreator.json';
import { BigNumber, Contract, Wallet } from 'ethers';
import {
  CRONOS_TESTNET_RPC,
  DEPLOYED_CONTRACT_ADDRESS,
  PRIVATE_KEY,
} from '../constants';

const withdraw = {
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

  async main(): Promise<void> {
    try {
      const contractAddress: string = DEPLOYED_CONTRACT_ADDRESS;
      const contractABI = _abi;
      const provider = new ethers.providers.JsonRpcProvider(CRONOS_TESTNET_RPC);
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
