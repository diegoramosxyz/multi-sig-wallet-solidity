import { ethers } from 'ethers'

export async function owners(contract: ethers.Contract, index: number) {
  let owner = await contract.owners(index)
  return owner.toString()
}

export async function isOwner(contract: ethers.Contract, address: string) {
  // returns a boolean
  return await contract.isOwner(address)
}

export async function numConfirmationsRequired(contract: ethers.Contract) {
  // returns a number
  return await contract.numConfirmationsRequired()
}

export async function isConfirmed(contract: ethers.Contract, index: number) {
  // returns a mapping
  return await contract.isConfirmed(index)
}

export async function transactions(contract: ethers.Contract, index: number) {
  // returns a transaction object
  return await contract.transactions(index)
}

export async function submitTransaction(
  contract: ethers.Contract,
  _to: string,
  _value: ethers.BigNumber,
  _data: string
) {
  try {
    await contract.submitTransaction(_to, _value, _data)
    return true
  } catch (error) {
    return false
  }
}

export async function confirmTransaction(
  contract: ethers.Contract,
  _txIndex: number
) {
  try {
    await contract.confirmTransaction(_txIndex)
    return true
  } catch (error) {
    return false
  }
}

export async function executeTransaction(
  contract: ethers.Contract,
  _txIndex: number
) {
  try {
    await contract.executeTransaction(_txIndex)
    return true
  } catch (error) {
    return false
  }
}

export async function revokeConfirmation(
  contract: ethers.Contract,
  _txIndex: number
) {
  try {
    await contract.revokeConfirmation(_txIndex)
    return true
  } catch (error) {
    return false
  }
}

export async function getTransactionCount(contract: ethers.Contract) {
  // Returns an integer
  return await contract.getTransactionCount()
}
