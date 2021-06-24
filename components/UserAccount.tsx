import { GlobalContext } from 'context/GlobalState'
import { useContext } from 'react'

export default function UserAccount() {
  const { state } = useContext(GlobalContext)

  return (
    <article className="mb-3">
      <section className="flex gap-2">
        <pre className="font-sans">Logged in as:</pre>
        <pre className="overflow-ellipsis overflow-hidden">
          <code className="font-mono">{state.user.address}</code>
        </pre>
      </section>

      <section className="flex gap-2">
        <span>Balance:</span>
        <pre className="">
          <code className="font-mono">
            {state.user.balance}
            <span> ETH</span>
          </code>
        </pre>
      </section>
    </article>
  )
}
