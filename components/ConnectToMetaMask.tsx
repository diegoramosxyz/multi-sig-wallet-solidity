import { GlobalContext } from 'context/GlobalState'
import { useContext } from 'react'
import { getBalance } from 'utils/eventData'

export default function ConnectToMetaMask() {
  const {
    state: { provider },
    dispatch,
  } = useContext(GlobalContext)
  // EIP 1102 - Opt-in account exposure
  // How to connect to an user's wallet
  // https://eips.ethereum.org/EIPS/eip-1102
  async function connetToMetaMask() {
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    if (provider) {
      try {
        let accounts = await provider.send('eth_requestAccounts', [])
        let balance = await getBalance(provider, accounts[0])
        dispatch({
          type: 'UPDATE_USER',
          payload: {
            balance,
            address: accounts[0],
          },
        })
      } catch (err) {
        // EIP-1193: Ethereum Provider JavaScript API
        // All provider error types can be checked here: https://eips.ethereum.org/EIPS/eip-1193#provider-errors
        console.error(err)
      }
    }
  }

  return (
    <button
      disabled={!!provider?.getSigner()._address}
      className={`transition px-3 py-2 rounded ring-1 ring-yellow-300 ${
        !!provider?.getSigner()._address
          ? 'cursor-not-allowed'
          : 'hover:ring-yellow-600'
      }`}
      onClick={async () => await connetToMetaMask()}
    >
      Connect to MetaMask
    </button>
  )
}
