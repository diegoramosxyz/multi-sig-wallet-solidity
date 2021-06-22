import { MultiSigWalletContract } from './types'

export async function confirmationsRequired(contract: MultiSigWalletContract) {
  return (await contract.numConfirmationsRequired()).toNumber()
}
