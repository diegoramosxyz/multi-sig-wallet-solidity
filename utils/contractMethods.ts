import { ethers } from 'ethers'
import { MultiSigWalletContract } from './types'

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

export async function getAllTransactions(
  contract: MultiSigWalletContract,
  provider: ethers.providers.Web3Provider
) {
  let length = (await contract.getTransactionCount()).toNumber()
  let arr: any[] = []
  for (let i = 0; i < length; i++) {
    arr.push(
      await getOneTransaction(contract, provider, ethers.BigNumber.from(i))
    )
  }
  return arr
}

export async function getOneTransaction(
  contract: MultiSigWalletContract,
  provider: ethers.providers.Web3Provider,
  index: ethers.BigNumber
) {
  // Determine wether the transaction
  // has been confirmed by the currently active address
  let isConfirmed = await contract.isConfirmed(
    ethers.BigNumber.from(index),
    await provider.getSigner().getAddress()
  )

  // The transaction
  let tx = await contract.transactions(index)
  let formattedTx = {
    ...tx,
    numConfirmations: tx.numConfirmations.toNumber(),
    value: ethers.utils.formatEther(tx.value),
  }

  return {
    ...formattedTx,
    isConfirmed,
  }
}
