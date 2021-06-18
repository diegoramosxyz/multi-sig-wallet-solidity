import { State } from 'interfaces'
import { ethers } from 'ethers'

export async function owners(state: State, index: number) {
  let owner = await state.contract.owners(index)
  return owner.toString()
}

export async function isOwner(state: State, address: string) {
  // returns a boolean
  return await state.contract.isOwner(address)
}

export async function numConfirmationsRequired(state: State) {
  // returns a number
  return await state.contract.numConfirmationsRequired()
}

export async function isConfirmed(state: State, index: number) {
  // returns a mapping
  return await state.contract.isConfirmed(index)
}

export async function transactions(state: State, index: number) {
  // returns a transaction object
  return await state.contract.transactions(index)
}

export async function submitTransaction(
  state: State,
  _to: string,
  _value: ethers.BigNumber,
  _data: string
) {
  try {
    await state.contract.submitTransaction(_to, _value, _data)
    return true
  } catch (error) {
    return false
  }
}

export async function confirmTransaction(state: State, _txIndex: number) {
  try {
    await state.contract.confirmTransaction(_txIndex)
    return true
  } catch (error) {
    return false
  }
}

export async function executeTransaction(state: State, _txIndex: number) {
  try {
    await state.contract.executeTransaction(_txIndex)
    return true
  } catch (error) {
    return false
  }
}

export async function revokeConfirmation(state: State, _txIndex: number) {
  try {
    await state.contract.revokeConfirmation(_txIndex)
    return true
  } catch (error) {
    return false
  }
}

export async function getTransactionCount(state: State) {
    // Returns an integer
  return await state.contract.getTransactionCount()
}
