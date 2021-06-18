async function sendTx() {
  let params = [
    {
      from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      gas: Number(21000).toString(16),
      gasPrice: Number(2500000).toString(16),
      value: Number(1000000000000000000).toString(16),
    },
  ]
  await window.ethereum
    .request({ method: 'eth_sendTransaction', params })
    .catch((err: Error) => console.error(err))
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
