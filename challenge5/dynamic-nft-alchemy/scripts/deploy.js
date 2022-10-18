const hre = require("hardhat");

async function main() {
  const BullAndBear = await hre.ethers.getContractFactory("BullBear")
  const bullAndBear = await BullAndBear.deploy()

  await bullAndBear.deployed()

  console.log(
    `Contract deployed at: ${bullAndBear.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
