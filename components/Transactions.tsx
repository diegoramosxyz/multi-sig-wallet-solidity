import { useContext } from 'react'
import { GlobalContext } from 'context/GlobalState'
import { getTransaction as getTx } from 'utils/contractMethods'

export default function Transactions() {
  const {
    state: { transactions, contract },
  } = useContext(GlobalContext)

  return (
    <div>
      <h1 className="text-lg font-semibold mb-3">Transactions</h1>
      {transactions.map((tx: any, i: number) => (
        <div key={i} className="mb-5">
          <p className="font-mono">To: {tx.to}</p>
          <p>Value: {tx.value} ETH</p>
          <p>Executed: {tx.executed ? 'True' : 'False'}</p>
          <p>Confirmaitons: {tx.numConfirmations}</p>
          <p>Data: {tx.data}</p>
          <button
            className="my-3 px-3 py-2 bg-blue-800 rounded"
            onClick={async () =>
              contract &&
              // @ts-ignore
              console.log(await getTx(contract, tx.txIndex))
            }
          >
            Confirm
          </button>
        </div>
      ))}
    </div>
  )
}
