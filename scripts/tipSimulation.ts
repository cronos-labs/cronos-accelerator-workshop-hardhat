import { BigNumber, Contract, ContractFactory } from 'ethers';
import hre from 'hardhat';

/**
 * Simulation utilities for interacting with Ethereum blockchain using Hardhat and ethers.js.
 * Provides functionalities to get and print balances, print comments, and run a deployment simulation.
 */
const simulation = {
  /**
   * Retrieves the Ether balance of a specified address and returns it as a string.
   * This function queries the balance using the ethers provider and formats it to a human-readable string.
   *
   * @param {string} address - The Ethereum address to query the balance for.
   * @returns {Promise<string>} - A promise that resolves to the balance of the specified address in Ether,
   *                              formatted as a string.
   */
  async getBalance(address: string): Promise<string> {
    try {
      const balanceBigInt: BigNumber = await hre.waffle.provider.getBalance(
        address
      );
      return hre.ethers.utils.formatEther(balanceBigInt);
    } catch (error) {
      console.log(error);
      return '0';
    }
  },

  /**
   * Logs the Ether balances of a list of addresses to the console.
   * This function iterates over each address, retrieves its balance using `getBalance`, and prints the balance.
   *
   * @param {string[]} addresses - An array of Ethereum addresses to log the balances for.
   * @returns {Promise<void>} - A promise that resolves once all balances have been successfully logged.
   *                            Does not explicitly resolve with any value.
   */
  async printBalances(addresses: string[]): Promise<void> {
    let idx: number = 0;
    try {
      for (const address of addresses) {
        console.log(
          `Address ${idx} balance: `,
          await simulation.getBalance(address)
        );
        idx++;
      }
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Prints comments stored on-chain. Each comment includes a timestamp, name, address, and message.
   * This function iterates over each comment and logs it in a readable format.
   *
   * @param {Array<{timestamp: string, name: string, from: string, message: string}>} comments - An array of comment objects.
   * @returns {Promise<void>} - A promise that resolves once all comments have been successfully logged.
   *                            Does not explicitly resolve with any value.
   */
  async printComments(
    comments: {
      timestamp: string;
      name: string;
      from: string;
      message: string;
    }[]
  ): Promise<void> {
    try {
      for (const memo of comments) {
        const timestamp = memo.timestamp;
        const tipper = memo.name;
        const tipperAddress = memo.from;
        const message = memo.message;
        console.log(
          `At ${timestamp}, ${tipper} (${tipperAddress}) commented: "${message}"`
        );
      }
    } catch (err) {
      console.log(err);
    }
  },

  /**
   * Main function to run the simulation. This includes deploying the TipCreator contract,
   * simulating tip transactions, withdrawing tips, and printing the contract's stored comments.
   * This function showcases a typical interaction sequence with the TipCreator contract.
   *
   * @returns {Promise<void>} - A promise that resolves once the simulation has completed.
   *                            If an error occurs during the simulation, the promise rejects with the error.
   */
  async main(): Promise<void> {
    try {
      const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();
      const TipCreator: ContractFactory = await hre.ethers.getContractFactory(
        'TipCreator'
      );
      const tipCreator: Contract = await TipCreator.deploy();

      await tipCreator.deployed();
      console.log('TipCreatorContract deployed to:', tipCreator.address);

      const addresses: string[] = [
        owner.address,
        tipper.address,
        tipCreator.address,
      ];
      console.log('== start ==');
      await simulation.printBalances(addresses);

      const tip: {
        value: BigNumber;
      } = { value: hre.ethers.utils.parseEther('1') };
      await tipCreator
        .connect(tipper)
        .tipCreator('Ric', 'Great Content, keep going', tip);
      await tipCreator
        .connect(tipper2)
        .tipCreator('Leslie', 'Love this content', tip);
      await tipCreator
        .connect(tipper3)
        .tipCreator('Fran', 'such cool, much nice', tip);

      console.log('== Tips ==');
      await simulation.printBalances(addresses);

      await tipCreator.connect(owner).withdrawTips();

      console.log('== withdrawTips ==');
      await simulation.printBalances(addresses);

      console.log('== comments ==');
      const comments: {
        timestamp: string;
        name: string;
        from: string;
        message: string;
      }[] = await tipCreator.getComments();
      simulation.printComments(comments);
    } catch (error) {
      console.error(error);
    }
  },
};

simulation
  .main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
