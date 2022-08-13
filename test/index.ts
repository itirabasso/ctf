import { AbiCoder } from "@ethersproject/abi";
import { parseEther } from "@ethersproject/units";
import { Wallet } from "@ethersproject/wallet";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { deployments, ethers, getNamedAccounts, network, run } from "hardhat";

const { expectRevert } = require('@openzeppelin/test-helpers');

describe("Tests", function () {

  let admin: SignerWithAddress

  const get = async (name: string) => {
    const signer = (await ethers.getSigners())[0]
    const deployed = await deployments.get(name)
    return ethers.getContractAt(deployed.abi, deployed.address, signer);
  }

  this.beforeAll(async function() {

    await deployments.run()

  })

  async function deploy(name: string, args ?: any[]): Promise<Contract> {
    return deployContract(name, name, args)
  }

  async function deployContract(name: string, contract: string, args ?: any[]): Promise<Contract> {
    const { deployer, dev } = await getNamedAccounts()
    
    const deployed = await deployments.getOrNull(name)

    if (!deployed) {
      await deployments.deploy(name, {
        from: deployer,
        args: args,
        log: true,
        contract,
        deterministicDeployment: false
      });
    }

    return get(name)
  }

  this.beforeEach(async function() {
  })


});
