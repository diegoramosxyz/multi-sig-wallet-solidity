import { ethers } from 'ethers'

// Ethers docs
// https://docs.ethers.io/v5/api/utils/bignumber/#BigNumber

// https://docs.ethers.io/v5/api/contract/contract/#Contract-on

export function DepositEventListener(contract: ethers.Contract) {
  contract.on(
    'Deposit',
    (sender: string, amount: ethers.BigNumber, balance: ethers.BigNumber) =>
      console.log({
        event: 'Deposit',
        sender,
        amount: ethers.utils.formatEther(amount),
        balance: ethers.utils.formatEther(balance),
      })
  )
}

export function SubmitTransactionEventListener(contract: ethers.Contract) {
  contract.on(
    'SubmitTransaction',
    (
      owner: string,
      txIndex: ethers.BigNumber,
      to: string,
      value: ethers.BigNumber,
      data: string
    ) =>
      console.log({
        event: 'SubmitTransaction',
        owner,
        txIndex: txIndex.toNumber(),
        to,
        value: ethers.utils.formatEther(value),
        data,
      })
  )
}

export function ConfirmTransactionEventListener(contract: ethers.Contract) {
  contract.on(
    'ConfirmTransaction',
    (owner: string, txIndex: ethers.BigNumber) =>
      console.log({
        event: 'ConfirmTransaction',
        owner,
        txIndex: txIndex.toNumber(),
      })
  )
}

export function RevokeConfirmationEventListener(contract: ethers.Contract) {
  contract.on(
    'RevokeConfirmation',
    (owner: string, txIndex: ethers.BigNumber) =>
      console.log({
        event: 'RevokeConfirmation',
        owner,
        txIndex: txIndex.toNumber(),
      })
  )
}

export function ExecuteTransactionEventListener(contract: ethers.Contract) {
  contract.on(
    'ExecuteTransaction',
    (owner: string, txIndex: ethers.BigNumber) =>
      console.log({
        event: 'ExecuteTransaction',
        owner,
        txIndex: txIndex.toNumber(),
      })
  )
}
