import { GlobalContext } from 'context/GlobalState'
import { useContext } from 'react'

export default function Owners() {
  const {
    state: { owners },
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
    </div>
  )
}
