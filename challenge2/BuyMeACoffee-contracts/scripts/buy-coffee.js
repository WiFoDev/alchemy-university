const hre = require("hardhat");

async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function printBalances(addresses) {
  for (let i = 0; i < addresses.length; i++) {
    console.log(`Address ${i} balance: `, await getBalance(addresses[i]));
  }
}

async function printMemos(memos) {
  for (const memo of memos) {
    const {timestamp, name: tipper, from: tipperAddress, message} = memo
    console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`)
  }
}

async function main() {
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();

  await buyMeACoffee.deployed();
  console.log(`BuyMeACoffee Contract deployed at: ${buyMeACoffee.address}`);

  const addresses = [owner.address, tipper.address, buyMeACoffee.address]
  console.log("===Start===")
  await printBalances(addresses)

  const tip = {value: hre.ethers.utils.parseEther("1")}
  await buyMeACoffee.connect(tipper).buyACoffee("Carolina","You're the best!", tip)
  await buyMeACoffee.connect(tipper2).buyACoffee("Vitto","Amazing teacher!", tip)
  await buyMeACoffee.connect(tipper3).buyACoffee("WiFo","I love my Proof of Knowledge!", tip)
  
  console.log("===Bought Coffee===")
  await printBalances(addresses)
  
  await buyMeACoffee.connect(owner).withdrawTips()

  console.log("===Withdraw Tips===")
  await printBalances(addresses)

  console.log("===Memos===")
  const memos = await buyMeACoffee.getMemos()
  await printMemos(memos)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then(()=>process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
