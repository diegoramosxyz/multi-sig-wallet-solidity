import { ethers } from 'ethers'
import { Actions } from 'interfaces'
import { Dispatch } from 'react'
import { getOneTransaction } from './contractMethods'
import { MultiSigWalletContract } from './types'

// Ethers docs
// https://docs.ethers.io/v5/api/utils/bignumber/#BigNumber

// https://docs.ethers.io/v5/api/contract/contract/#Contract-on

// TODO: Update state variables using dispatch
export function DepositEventListener(contract: MultiSigWalletContract) {
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

export function ContractEventListener(
  contract: MultiSigWalletContract,
  provider: ethers.providers.Web3Provider,
  dispatch: Dispatch<Actions>,
  event:
    | 'ConfirmTransaction'
    | 'ExecuteTransaction'
    | 'RevokeConfirmation'
    | 'SubmitTransaction'
) {
  contract.on(event, async (_, txIndex: ethers.BigNumber) => {
    dispatch({
      type: 'UPDATE_TRANSACTION',
      payload: {
        txIndex,
        tx: await getOneTransaction(contract, provider, txIndex),
      },
    })
  })
}
