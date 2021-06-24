import { useContext } from 'react'
import { GlobalContext } from 'context/GlobalState'
import { ethers } from 'ethers'
import { transaction } from 'utils/types'

export default function Transactions() {
  const {
    state: { transactions, contract, user, txStatus, confirmationsRequired },
  } = useContext(GlobalContext)

  const { dispatch } = useContext(GlobalContext)

  return (
    <div>
      <header>
        <h1 className="text-2xl font-semibold mb-3">Transactions</h1>
      </header>

      <p className="mb-5 font-semibold">
        Confirmations required: {confirmationsRequired}
      </p>
      <section className="grid gap-3 justify-center md:grid-cols-2 leading-relaxed mb-10 md:mb-0">
        {transactions
          .map((tx: transaction, index: number) => (
            <article key={index} className="p-1 overflow-hidden">
              <p className="font-mono">
                <pre className="font-sans">To: </pre>
                <pre className="overflow-ellipsis overflow-hidden">
                  <code className="font-mono">{tx.to}</code>
                </pre>
              </p>
              <p>
                Value: <strong>{ethers.utils.formatEther(tx.value)} ETH</strong>
              </p>
              <p>Executed: {tx.executed ? 'True' : 'False'}</p>
              <p>Confirmaitons: {tx.numConfirmations.toNumber()}</p>
              <p>Data: {tx.data}</p>
              {!tx.executed && (
                <div>
                  {txStatus?.index === index ? (
                    txStatus.confirmed ? (
                      <button
                        className="my-3 px-3 py-2 bg-red-800 rounded mr-3"
                        onClick={async () =>
                          contract &&
                          console.log(
                            await contract.revokeConfirmation(
                              ethers.BigNumber.from(index)
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
                              ethers.BigNumber.from(index)
                            )
                          )
                        }
                      >
                        Confirm
                      </button>
                    )
                  ) : (
                    <button
                      className="my-3 px-3 py-2 bg-green-800 rounded mr-3"
                      onClick={async () => {
                        if (contract && user.address) {
                          let confirmed = await contract.isConfirmed(
                            ethers.BigNumber.from(index),
                            user.address
                          )
                          dispatch({
                            type: 'TX_STATUS',
                            payload: { index, confirmed },
                          })
                        }
                      }}
                    >
                      Actions
                    </button>
                  )}
                  {txStatus?.index === index &&
                    tx.numConfirmations.toNumber() >= 2 && (
                      <button
                        className="my-3 px-3 py-2 bg-blue-800 rounded"
                        onClick={async () =>
                          contract &&
                          console.log(
                            await contract.executeTransaction(
                              ethers.BigNumber.from(index)
                            )
                          )
                        }
                      >
                        Execute
                      </button>
                    )}
                </div>
              )}
            </article>
          ))
          .reverse()}
      </section>
    </div>
  )
}
