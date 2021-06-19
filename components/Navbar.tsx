import ConnectToMetaMask from 'components/ConnectToMetaMask'

export default function Nav() {
  return (
    <nav className="z-10 px-4 py-2.5 fixed md:static bottom-0 w-full bg-trueGray-900 text-trueGray-200 border-t md:border-t-0 md:border-b border-trueGray-200 dark:border-trueGray-800">
      <section className="flex items-center justify-between">
        <p className="md:text-xl font-bold">Multi-Sig Wallet 🔐</p>
        <section className="flex items-center space-x-5">
          <ConnectToMetaMask />
        </section>
      </section>
    </nav>
  )
}
