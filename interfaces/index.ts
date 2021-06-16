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
}

export type Actions = {
  type: 'CONNECT' | 'METAMASK' | 'BALANCE'
  payload?: any
}
