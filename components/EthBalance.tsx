import { GlobalContext } from 'context/GlobalState'
import React, { useContext } from 'react'

export default function EthBalance() {
  const { state, dispatch } = useContext(GlobalContext)

  return (
    <React.Fragment>
      <button
        disabled={state.metamask.address === ''}
        onClick={async () => {
          // MetaMask guide on Ethereum JSON-RPC Methods
          // https://docs.metamask.io/guide/rpc-api.html#ethereum-json-rpc-methods
          let balance = await window.ethereum
            .request({
              method: 'eth_getBalance',
              params: [state.metamask.address],
            })
            .catch((err: Error) => console.error(err))

          // Format balance into ETHER
          // Convert from hex to base 10
          let i = parseInt(balance || '0')
          // t is 10 raised to the 10th power, which is one wei,
          // the smallest unit of ether
          let t = Math.pow(10, 18)
          // Get balance in terms of ETH
          let eth = i / t

          dispatch({ type: 'BALANCE', payload: eth })
        }}
        className={`px-3 py-2 rounded bg-purple-700 text-white ${
          state.metamask.address === '' ? 'cursor-not-allowed' : ''
        }`}
      >
        Check ETH balance
      </button>
      <p>{state.metamask.address}</p>
      <p>{`Balance: ${state.metamask.balance} ETH`}</p>
    </React.Fragment>
  )
}
