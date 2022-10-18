const hre = require('hardhat')
const {abi} = require('../artifacts/contracts/Bull&Bear.sol/BullBear.json') 

const main = async () => {
  const [owner, account1] = await hre.ethers.getSigners()
  
  const BullAndBear = await hre.ethers.getContractFactory('BullBear')
  const bullAndBear = await BullAndBear.deploy()

  await bullAndBear.deployed()

  const tx = await bullAndBear.connect(account1).safeMint(account1.address)
  await tx.wait()

  const uri = await bullAndBear.connect(account1).tokenURI(0)
  
  console.log(`This is the URI: ${uri}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })