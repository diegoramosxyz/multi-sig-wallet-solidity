// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat')

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  let accounts = await hre.ethers.getSigners()

  // We get the contract to deploy
  const Factory = await hre.ethers.getContractFactory('MultiSigWallet')
  const contract = await Factory.deploy(
    [accounts[0].address, accounts[1].address, accounts[2].address],
    2
  )

  await contract.deployed()

  console.log('Multi Sig Wallet deployed to:', contract.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
