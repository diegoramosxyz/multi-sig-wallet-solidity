// The 'state' parameter for the useReducer function
// is the current state. The action is a function that gets
// called to update the state.

import {
  ConfirmTransactionEventListener,
  DepositEventListener,
  ExecuteTransactionEventListener,
  RevokeConfirmationEventListener,
  SubmitTransactionEventListener,
} from 'utils/eventListeners'

// TODO: Revise types
const AppReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          balance: action.payload.balance,
          address: action.payload.address,
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
      DepositEventListener(action.payload)
      SubmitTransactionEventListener(action.payload)
      ConfirmTransactionEventListener(action.payload)
      RevokeConfirmationEventListener(action.payload)
      ExecuteTransactionEventListener(action.payload)
      return {
        ...state,
        contract: action.payload,
      }
    default:
      return state
  }
}
export default AppReducer
