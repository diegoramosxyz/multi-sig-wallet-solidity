import { useContext } from 'react'
import { GlobalContext } from 'context/GlobalState'
import { ethers } from 'ethers'

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
          {!tx.executed && (
            <div>
              {tx.isConfirmed ? (
                <button
                  className="my-3 px-3 py-2 bg-red-800 rounded mr-3"
                  onClick={async () =>
                    contract &&
                    console.log(
                      await contract.revokeConfirmation(
                        ethers.BigNumber.from(i)
                      )
                    )
                  }
                >
                  Revoke
                </button>
              ) : (
                <button
                  className="my-3 px-3 py-2 bg-blue-800 rounded mr-3"
                  onClick={async () =>
                    contract &&
                    console.log(
                      await contract.confirmTransaction(
                        ethers.BigNumber.from(i)
                      )
                    )
                  }
                >
                  Confirm
                </button>
              )}
              {tx.numConfirmations >= 2 && (
                <button
                  className="my-3 px-3 py-2 bg-blue-800 rounded"
                  onClick={async () =>
                    contract &&
                    console.log(
                      await contract.executeTransaction(
                        ethers.BigNumber.from(i)
                      )
                    )
                  }
                >
                  Execute
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
