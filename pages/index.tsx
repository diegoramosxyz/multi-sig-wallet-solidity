import Layout from 'components/Layout'
import { ethers, Contract } from 'ethers'
import EthBalance from 'components/EthBalance'
import SendEth from 'components/SendEth'
import CallContract from 'components/CallContract'
import GetTransaction from 'components/GetTransaction'
import SubmitTransaction from 'components/SubmitTransaction'
import { useEffect } from 'react'
import { GlobalContext } from 'context/GlobalState'
import { useContext } from 'react'
import MultiSigWallet from '../artifacts/contracts/MultiSigWallet.sol/MultiSigWallet.json'

export default function index() {
  const { dispatch } = useContext(GlobalContext)
  // MultiSigWallet contract running locally on hardhat node
const contractAddress = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512'

  useEffect(() => {
    // Check that the MetaMask is installed
    if (window.ethereum) {
      // Detect when accounts are changed in MetaMask
      window.ethereum
        .on('accountsChanged', (accounts: string[]) =>
          dispatch({ type: 'METAMASK', payload: accounts[0] })
        )

      // Detect the account on MetaMask upon page reload
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts: string[]) =>
          dispatch({ type: 'METAMASK', payload: accounts[0] })
        )
        .catch((err: Error) => console.error(err))
    } else {
      // Prompt user to install MetaMask
      // Todo: Show pop up message
      console.log('INSTALL METAMASK TO USE THIS DAPP!')
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Create a new Contract instance for the Multi Sig Wallet
    let contract = new Contract(contractAddress, MultiSigWallet.abi, provider.getSigner())
    // Save the contract in a global state variable
    dispatch({ type: 'ADD_CONTRACT', payload: contract })
  }, [])

  return (
    <Layout head="Multi-Sig Wallet">
      <h1 className="text-center text-3xl mb-4">
        Hello Decentralized World! 👋
      </h1>
      <EthBalance />
      <SendEth/>
      <CallContract/>
      <SubmitTransaction/>
      <GetTransaction/>
    </Layout>
  )
}
