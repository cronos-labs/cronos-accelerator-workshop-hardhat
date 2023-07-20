import { Contract, ContractFactory } from 'ethers';
import { ethers } from 'hardhat';

const deploy = {
  /**
   * Main function to deploy the TipCreator contract.
   * @returns {Promise<void>}
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
