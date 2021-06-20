import { ethers } from 'ethers'
import { MultiSigWalletContract } from './types'

// Convert Array output to Object
export async function getTransaction(
  contract: MultiSigWalletContract,
  index: ethers.BigNumber
) {
  // returns a transaction object
  let { to, data, executed, numConfirmations, value } =
    await contract.transactions(index)
  return {
    to,
    value: ethers.utils.formatEther(value),
    data,
    executed,
    numConfirmations: numConfirmations.toNumber(),
  }
}

export async function getOwners(contract: MultiSigWalletContract) {
  // TODO: Get the length of owners array
  // let length = (await contract.getOwnersLength()).toNumber()
  let arr = []
  for (let i = 0; i < 3; i++) {
    let owner = await contract.owners(ethers.BigNumber.from(i))
    arr.push(owner.toString())
  }
  return arr
}
