import React from 'react'
import { ethers } from 'ethers'

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
  provider: ethers.providers.Web3Provider | null
  contract: ethers.Contract | null
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
  payload?: any
}
