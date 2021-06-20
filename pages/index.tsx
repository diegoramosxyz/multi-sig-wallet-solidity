import Layout from 'components/Layout'
import { ethers, Contract } from 'ethers'
import UserAccount from 'components/UserAccount'
import SubmitTransaction from 'components/SubmitTransaction'
import DepositEth from 'components/DepositEth'
import Owners from 'components/Owners'
import { useEffect, useContext } from 'react'
import { GlobalContext } from 'context/GlobalState'
import MultiSigWallet from '../artifacts/contracts/MultiSigWallet.sol/MultiSigWallet.json'
import { getBalance, getOwners } from 'utils/eventData'
import Transactions from 'components/Transactions'
import { getTransaction } from 'utils/contractMethods'

export default function index() {
  const { dispatch } = useContext(GlobalContext)
  // MultiSigWallet contract running locally on hardhat node
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

  useEffect(() => {
    // Get the provider from the browser
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    dispatch({ type: 'ADD_PROVIDER', payload: provider })

    // Create a new Contract instance for the Multi Sig Wallet
    let contract = new Contract(
      contractAddress,
      MultiSigWallet.abi,
      provider.getSigner()
    )
    dispatch({ type: 'ADD_CONTRACT', payload: contract })

    // Check that the MetaMask is installed
    if (window.ethereum) {
      // Detect the account on MetaMask upon page reload
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then(async (accounts: string[]) => {
          let balance = await getBalance(provider, accounts[0])
          dispatch({
            type: 'UPDATE_USER',
            payload: {
              address: accounts[0],
              balance,
            },
          })
        })
        .catch((err: Error) => console.error(err))

      // Detect when accounts are changed in MetaMask
      window.ethereum.on('accountsChanged', async (accounts: string[]) => {
        // Add event listerner to detect when accounts are changed in MetaMask
        let balance = await getBalance(provider, accounts[0])
        dispatch({
          type: 'UPDATE_USER',
          payload: {
            address: accounts[0],
            balance,
          },
        })
      })
    } else {
      // Prompt user to install MetaMask
      // Todo: Show pop up message
      console.log('INSTALL METAMASK TO USE THIS DAPP!')
    }

    // TODO: Update automatically using on events
    ;(async () => {
      let length = (await contract.getTransactionCount()).toNumber()
      let arr: any[] = []
      for (let i = 0; i < length; i++) {
        arr.push(await getTransaction(contract, i))
      }
      let owners = await getOwners(contract)
      dispatch({ type: 'UPDATE_OWNERS', payload: owners })
      let balance = await getBalance(provider, contract.address)
      dispatch({ type: 'UPDATE_BALANCES', payload: balance })
      dispatch({
        type: 'ADD_TRANSACTIONS',
        payload: arr,
      })
    })()
  }, [])

  return (
    <Layout head="Multi-Sig Wallet">
      <UserAccount />
      <Owners />
      <DepositEth />
      <SubmitTransaction />
      <Transactions />
    </Layout>
  )
}
