import { useContext } from 'react'
import { GlobalContext } from 'context/GlobalState'
import { owners } from 'utils/contractMethods'

export default function CallContract() {
  const { state } = useContext(GlobalContext)

  return (
    <button
      onClick={() => console.log('Owner at index 0: ', owners(state, 0))}
      className="px-3 py-2 rounded bg-red-800 text-white"
    >
      Call Contract
    </button>
  )
}
