import { useContext } from 'react'
import { GlobalContext } from 'context/GlobalState'

export default function CallContract() {
  const { state } = useContext(GlobalContext)

  async function getOwners() {
    let owners = await state.contract.owners(2)
    console.log(`${owners}`)
  }

  return (
    <button
      onClick={() => getOwners()}
      className="px-3 py-2 rounded bg-red-800 text-white"
    >
      Call Contract
    </button>
  )
}
