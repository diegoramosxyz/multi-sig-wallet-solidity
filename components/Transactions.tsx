import { useContext } from 'react'
import { GlobalContext } from 'context/GlobalState'
import { ethers } from 'ethers'
import { transaction } from 'utils/types'

export default function Transactions() {
  const {
    state: { transactions, contract, user, txStatus },
  } = useContext(GlobalContext)

  const { dispatch } = useContext(GlobalContext)

  return (
    <div>
      <h1 className="text-lg font-semibold mb-3">Transactions</h1>
      {transactions
        .map((tx: transaction, index: number) => (
          <div key={index} className="mb-5">
            <p className="font-mono">To: {tx.to}</p>
            <p>Value: {ethers.utils.formatEther(tx.value)} ETH</p>
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
          </div>
        ))
        .reverse()}
    </div>
  )
}
