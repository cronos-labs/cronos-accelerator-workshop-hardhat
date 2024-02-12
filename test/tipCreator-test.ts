import { expect } from 'chai';
import { BigNumber, Contract, ContractFactory, Signer } from 'ethers';
import { ethers } from 'hardhat';

/**
 * Test suite for the TipCreator contract.
 * Ensures that the contract deployment, tipping functionality, and withdrawal process work as expected.
 */
describe('TipCreator', function () {
  let tipCreator: Contract;
  let owner: Signer;
  let tipper: Signer;

  /**
   * Before each test, deploy the TipCreator contract and get the owner and tipper signers.
   */
  beforeEach(async function () {
    const TipCreator: ContractFactory = await ethers.getContractFactory(
      'TipCreator'
    );
    tipCreator = await TipCreator.deploy();
    await tipCreator.deployed();

    [owner, tipper] = await ethers.getSigners();
  });

  /**
   * Tests if the TipCreator contract is deployed correctly by checking if it has an address.
   */
  it('should deploy the contract correctly', async function () {
    expect(tipCreator.address).to.not.equal(0);
  });

  /**
   * Tests the tipping functionality of the TipCreator contract.
   * Ensures that a tip can be sent along with a comment, and the comment is stored correctly.
   */
  it('should allow tipping and store the comment', async function () {
    const name: string = 'Ric';
    const message: string = 'Great content!';
    const address: string = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';

    const initialComments: string = await tipCreator.getComments();
    expect(initialComments.length).to.equal(0);

    const tipAmount: BigNumber = ethers.utils.parseEther('1');
    await tipCreator.tipCreator(name, message, { value: tipAmount });

    const comments: { from: string; name: string; message: string }[] =
      await tipCreator.getComments();
    expect(comments.length).to.equal(1);
    expect(comments[0].from.toLowerCase()).to.equal(address);
    expect(comments[0].name).to.equal(name);
    expect(comments[0].message).to.equal(message);
  });

  /**
   * Tests the withdrawal functionality of the TipCreator contract.
   * Ensures the contract owner can withdraw the accumulated tips.
   */
  it('should allow the owner to withdraw tips', async function () {
    const tipAmount: BigNumber = ethers.utils.parseEther('1');
    const finalAmount: string = '9996932131026772741510';

    await tipCreator
      .connect(tipper)
      .tipCreator('Ric', 'Great content!', { value: tipAmount });

    await tipCreator.connect(owner).withdrawTips();

    const finalBalance: BigNumber = await ethers.provider.getBalance(
      await owner.getAddress()
    );
    expect(finalBalance.toString().slice(1, 0)).to.equal(
      finalAmount.slice(1, 0)
    );
  });
});
