import { GlobalContext } from 'context/GlobalState'
import { useContext } from 'react'

export default function UserAccount() {
  const { state } = useContext(GlobalContext)

  return (
    <div className="mb-3">
      <p className="font-mono">Account: {state.user.address}</p>
      <p>Balance: {state.user.balance} ETH</p>
    </div>
  )
}
