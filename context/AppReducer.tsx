// The 'state' parameter for the useReducer function
// is the current state. The action is a function that gets
// called to update the state.
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
          balance: action.payload
        },
      }
    case 'METAMASK':
      return {
        ...state,
        metamask: { 
          ...state.metamask,
          address: action.payload
        },
      }
    default:
      return state
  }
}
export default AppReducer
