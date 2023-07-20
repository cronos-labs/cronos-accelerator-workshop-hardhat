import { BigNumber, Contract, ContractFactory } from "ethers";
import hre from "hardhat";

const simulation = {
  /**
   * Returns the Ether balance of a given address.
   * @param {string} address - The address to get the balance for.
   * @returns {Promise<string>} The Ether balance formatted as a string.
   */
  async getBalance(address: string): Promise<string> {
    try {
      const balanceBigInt: BigNumber = await hre.waffle.provider.getBalance(
        address
      );
      return hre.ethers.utils.formatEther(balanceBigInt);
    } catch (error) {
      console.log(error);
      return "0";
    }
  },

  /**
   * Logs the Ether balances for a list of addresses.
   * @param {string[]} addresses - The list of addresses.
   * @returns {Promise<void>}
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
   * Logs the comments stored on-chain from comments.
   * @param {Comment[]} comments - The list of comments.
   * @returns {Promise<void>}
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
      for (const comment of comments) {
        const timestamp = comment.timestamp;
        const tipper = comment.name;
        const tipperAddress = comment.from;
        const message = comment.message;
        console.log(
          `At ${timestamp}, ${tipper} (${tipperAddress}) commented: "${message}"`
        );
      }
    } catch (err) {
      console.log(err);
    }
  },

  /**
   * Main function to run the simulation.
   * @returns {Promise<void>}
   */
  async main(): Promise<void> {
    try {
      const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();
      const TipCreator: ContractFactory = await hre.ethers.getContractFactory(
        "TipCreator"
      );
      const tipCreator: Contract = await TipCreator.deploy();

      await tipCreator.deployed();
      console.log("TipCreatorContract deployed to:", tipCreator.address);

      const addresses: string[] = [
        owner.address,
        tipper.address,
        tipCreator.address,
      ];
      console.log("== start ==");
      await simulation.printBalances(addresses);

      const tip: {
        value: BigNumber;
      } = { value: hre.ethers.utils.parseEther("1") };
      await tipCreator
        .connect(tipper)
        .tipCreator("Ric", "Great Content, keep going", tip);
      await tipCreator
        .connect(tipper2)
        .tipCreator("Leslie", "Love this content", tip);
      await tipCreator
        .connect(tipper3)
        .tipCreator("Fran", "such cool, much nice", tip);

      console.log("== Tips ==");
      await simulation.printBalances(addresses);

      await tipCreator.connect(owner).withdrawTips();

      console.log("== withdrawTips ==");
      await simulation.printBalances(addresses);

      console.log("== comments ==");
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
