import { useContext } from 'react'
import { GlobalContext } from 'context/GlobalState'

export default function Transactions() {
  const { state } = useContext(GlobalContext)

  return (
    <div>
      {state.transactions.map((tx: any) => (
        <div key={tx.txIndex} className="mb-5">
            <p>From: {tx.owner}</p>
            <p>To: {tx.to}</p>
            <p>Value: {tx.value} ETH</p>
        </div>
      ))}
    </div>
  )
}
