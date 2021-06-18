import React from 'react'

export type GlobalContextType = {
  state: State
  dispatch: React.Dispatch<Actions>
}

export type State = {
  connected: boolean
  metamask: {
    address: string
    balance: number
  }
  contract: any
}

export type Actions = {
  type: 'CONNECT' | 'METAMASK' | 'BALANCE' | 'ADD_CONTRACT'
  payload?: any
}
