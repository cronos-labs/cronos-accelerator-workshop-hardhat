import { Contract, ContractFactory } from 'ethers';
import { ethers } from 'hardhat';

/**
 * This script deploys the TipCreator contract to the blockchain.
 */
const deploy = {
  /**
   * Main function to deploy the TipCreator contract.
   * Utilizes ethers.js to create a contract factory and deploy the TipCreator contract.
   * Once deployed, the contract address is logged to the console.
   *
   * @returns {Promise<void>} - A promise that resolves when the contract is successfully deployed,
   *                            or rejects with an error if the deployment fails.
   */
  async main(): Promise<void> {
    try {
      const TipCreator: ContractFactory = await ethers.getContractFactory(
        'TipCreator'
      );
      const tipCreator: Contract = await TipCreator.deploy();

      await tipCreator.deployed();

      console.log('TipCreatorContract deployed to:', tipCreator.address);
    } catch (error) {
      console.log(error);
    }
  },
};

deploy
  .main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
