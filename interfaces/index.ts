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
  payload?: any
}
