import { expect } from 'chai';
import { BigNumber, Contract, ContractFactory, Signer } from 'ethers';
import { ethers } from 'hardhat';

describe('TipCreator', function () {
  let tipCreator: Contract;
  let owner: Signer;
  let tipper: Signer;

  beforeEach(async function () {
    const TipCreator: ContractFactory = await ethers.getContractFactory(
      'TipCreator'
    );
    tipCreator = await TipCreator.deploy();
    await tipCreator.deployed();

    [owner, tipper] = await ethers.getSigners();
  });

  it('should deploy the contract correctly', async function () {
    expect(tipCreator.address).to.not.equal(0);
  });

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
    expect(finalBalance.toString()).to.equal(finalAmount);
  });
});
