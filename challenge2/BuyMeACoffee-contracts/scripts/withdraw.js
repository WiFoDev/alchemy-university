const hre = require('hardhat');
const abi = require('../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json')

const CONTRACT_ADDRESS = "0x13e14AE64FAC938FBf2eFc40Eb6a67Fa83B82524"
const CONTRACT_ABI = abi.abi

async function getBalance(provider, address) {
  const balanceBigInt = await provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function main() {
  const provider = new hre.ethers.providers.AlchemyProvider("goerli",process.env.ALCHEMY_API_KEY)
  const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY,provider)

  const buyMeACoffee = new hre.ethers.Contract(CONTRACT_ADDRESS,CONTRACT_ABI,signer)

  console.log(`Current balance of owner: ${await getBalance(provider,signer.address)} ETH`)
  const contractBalance = await getBalance(provider,buyMeACoffee.address)
  console.log(`Current balance of contract: ${await getBalance(provider,buyMeACoffee.address)} ETH`)
  
  if (contractBalance === "0.0") {
    console.log('No funds to withdraw')
    return
  }
  console.log('Withdrawing funds...')
  const withdrawTxn = await buyMeACoffee.withdrawTips()
  await withdrawTxn.wait()
  console.log(`Current balance of owner: ${await getBalance(provider,signer.address)} ETH`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })