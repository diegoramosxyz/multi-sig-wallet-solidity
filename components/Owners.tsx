import { GlobalContext } from 'context/GlobalState'
import { useContext } from 'react'

export default function Owners() {
  const {
    state: { owners, confirmationsRequired },
  } = useContext(GlobalContext)
  return (
    <div className="mb-3">
      <header>Owners</header>
      <ul>
        {owners.map((owner) => (
          <li key={owner} className="font-mono">
            {owner}
          </li>
        ))}
      </ul>
      <p>Confirmations required: {confirmationsRequired}</p>
    </div>
  )
}
