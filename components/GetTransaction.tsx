import { useContext } from 'react'
import { GlobalContext } from 'context/GlobalState'

export default function CallContract() {
  const {
    state: { contract },
  } = useContext(GlobalContext)

  async function getTransaction() {
    if (contract) {
      let tx = await contract.transactions(0)
      console.log(tx)
    }
  }

  return (
    <button
      onClick={() => getTransaction()}
      className="px-3 py-2 rounded bg-blue-800 text-white"
    >
      Get Transaction
    </button>
  )
}
