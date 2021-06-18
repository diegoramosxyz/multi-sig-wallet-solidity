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

import { ethers } from 'ethers'

async function getTransactions(contract: ethers.Contract) {
  // @ts-ignore
  // queryFilter has the wrong type. Report.
  let res = await contract.queryFilter('SubmitTransaction')
  console.log(
    res.map((events) => {
      if (events.args) {
        let { args } = events
        return {
          owner: args['owner'],
          txIndex: args['txIndex'],
          to: args['to'],
          value: args['value'],
          data: args['data'],
        }
      }
    })
  )
}

// TODO: Revise types
const AppReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CONNECT':
      return { ...state, connected: !state.connected }
    case 'BALANCE':
      return {
        ...state,
        metamask: {
          ...state.metamask,
          balance: action.payload,
        },
      }
    case 'ADD_CONTRACT':
      DepositEventListener(action.payload)
      SubmitTransactionEventListener(action.payload)
      ConfirmTransactionEventListener(action.payload)
      RevokeConfirmationEventListener(action.payload)
      ExecuteTransactionEventListener(action.payload)
      getTransactions(action.payload)
      return {
        ...state,
        contract: action.payload,
      }
    case 'METAMASK':
      return {
        ...state,
        metamask: {
          ...state.metamask,
          address: action.payload ? action.payload : '',
        },
      }
    default:
      return state
  }
}
export default AppReducer
