import React from 'react'
import { ethers } from 'ethers'
import { MultiSigWalletContract } from 'utils/types'

export type GlobalContextType = {
  state: State
  dispatch: React.Dispatch<Actions>
}

export type State = {
  user: {
    balance: string | null
    address: string | null
  }
  balances: {
    contract: string | null
    userAccount: string | null
  }
  owners: string[]
  confirmationsRequired: number
  provider: ethers.providers.Web3Provider | null
  contract: MultiSigWalletContract | null
  transactions: any[]
}

export type Actions = {
  type:
    | 'UPDATE_USER'
    | 'ADD_CONTRACT'
    | 'ADD_TRANSACTIONS'
    | 'ADD_PROVIDER'
    | 'UPDATE_BALANCES'
    | 'UPDATE_OWNERS'
    | 'UPDATE_TRANSACTION'
  payload?: any
}
