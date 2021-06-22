// The 'state' parameter for the useReducer function
// is the current state. The action is a function that gets
// called to update the state.

import { State } from 'interfaces'

// TODO: Revise types
const AppReducer = (state: State, action: any) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          balance: action.payload.balance,
          address: action.payload.address,
        },
      }
    case 'UPDATE_TRANSACTION':
      // The transactions array is ordered in reverse
      // To show newest entries first
      let txs = [...state.transactions]
      // Update selected transaction
      txs[action.payload.txIndex] = action.payload.tx
      return {
        ...state,
        transactions: txs,
      }
    case 'UPDATE_BALANCES':
      return {
        ...state,
        balances: {
          ...state.balances,
          contract: action.payload,
        },
      }
    case 'ADD_TRANSACTIONS':
      return { ...state, transactions: action.payload }
    case 'ADD_PROVIDER':
      return {
        ...state,
        provider: action.payload,
      }
    case 'ADD_CONTRACT':
      return {
        ...state,
        contract: action.payload,
      }
    case 'UPDATE_OWNERS':
      return {
        ...state,
        owners: action.payload.owners,
        confirmationsRequired: action.payload.confirmationsRequired,
      }
    case 'TX_STATUS':
      return {
        ...state,
        txStatus: action.payload,
      }
    default:
      return state
  }
}
export default AppReducer
