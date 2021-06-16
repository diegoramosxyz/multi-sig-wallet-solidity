import Layout from 'components/Layout'
import EthBalance from 'components/EthBalance'

export default function index() {
  return (
    <Layout head="Multi-Sig Wallet">
      <h1 className="text-center text-3xl mb-4">
        Hello Decentralized World! 👋
      </h1>
      <EthBalance />
    </Layout>
  )
}
