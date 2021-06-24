import { GlobalContext } from 'context/GlobalState'
import { useContext } from 'react'

export default function Owners() {
  const {
    state: { owners },
  } = useContext(GlobalContext)
  return (
    <article className="mb-3">
      <header>
        <h1 className="text-2xl font-semibold mb-3">Owners</h1>
      </header>
      <ul>
        {owners.map((owner) => (
          <li
            key={owner}
            className="overflow-ellipsis overflow-hidden font-mono"
          >
            {owner}
          </li>
        ))}
      </ul>
    </article>
  )
}
