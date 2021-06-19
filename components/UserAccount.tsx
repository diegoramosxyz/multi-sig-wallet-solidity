import { GlobalContext } from 'context/GlobalState'
import { useContext } from 'react'

export default function UserAccount() {
  const { state } = useContext(GlobalContext)

  return (
    <>
      <p>{state.user.address}</p>
      <p>{`${state.user.balance} ETH`}</p>
    </>
  )
}
