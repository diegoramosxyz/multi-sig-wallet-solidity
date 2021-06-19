import { ethers } from 'ethers'
import { GlobalContext } from 'context/GlobalState'
import { useContext } from 'react'

async function sendTx() {
  const {
    state: { provider },
  } = useContext(GlobalContext)
  // https://docs.ethers.io/v5/api/providers/jsonrpc-provider/#JsonRpcProvider-send
  if (provider) {
    provider.send('eth_sendTransaction', [
      {
        from: await provider.getSigner().getAddress(),
        to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        gas: ethers.utils.hexValue(21000),
        gasPrice: ethers.utils.hexValue(2500000),
        value: ethers.utils.parseEther('1.0').toHexString(),
      },
    ])
  }
}

export default function SendEth() {
  return (
    <button
      className="rounded px-3 py-2 bg-green-800 text-white"
      onClick={() => sendTx()}
    >
      Send 1 ETH
    </button>
  )
}
