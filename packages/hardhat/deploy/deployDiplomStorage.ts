import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys the "DiplomStorage" contract using the deployer account.
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployDiplomStorage: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` or `yarn account:import` to import your
    existing PK which will fill DEPLOYER_PRIVATE_KEY_ENCRYPTED in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("DiplomStorage", {
    from: deployer,
    // Contract constructor arguments (no arguments for this constructor)
    args: [],
    log: true,
    autoMine: true, // Auto mine on local network
  });

  // Get the deployed contract to interact with it after deploying.
  const diplomStorage = await hre.ethers.getContract<Contract>("DiplomStorage", deployer);
  console.log("👋 DiplomStorage contract deployed at:", diplomStorage.address);
};

export default deployDiplomStorage;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags DiplomStorage
deployDiplomStorage.tags = ["DiplomStorage"];
