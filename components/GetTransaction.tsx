import { useContext } from 'react'
import { GlobalContext } from 'context/GlobalState'

export default function CallContract() {
  const { state } = useContext(GlobalContext)

  async function getTransaction() {
    let tx = await state.contract.transactions(0)
    console.log(tx)
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
