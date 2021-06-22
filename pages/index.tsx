import Layout from 'components/Layout'
import { ethers, Contract } from 'ethers'
import UserAccount from 'components/UserAccount'
import SubmitTransaction from 'components/SubmitTransaction'
import DepositEth from 'components/DepositEth'
import Owners from 'components/Owners'
import { useEffect, useContext } from 'react'
import { GlobalContext } from 'context/GlobalState'
import MultiSigWallet from '../artifacts/contracts/MultiSigWallet.sol/MultiSigWallet.json'
import { getBalance } from 'utils/eventData'
import Transactions from 'components/Transactions'
import {
  getOwners,
  getAllTransactions,
  confirmationsRequired,
} from 'utils/contractMethods'
import { MultiSigWalletContract } from 'utils/types'
import { ContractEventListener } from 'utils/eventListeners'

export default function index({
  MULTI_SIG_WALLET_ADDRESS,
}: {
  MULTI_SIG_WALLET_ADDRESS: string
}) {
  const { dispatch } = useContext(GlobalContext)
  // MultiSigWallet contract running locally on hardhat node

  useEffect(() => {
    // Get the provider from the browser
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    dispatch({ type: 'ADD_PROVIDER', payload: provider })

    // Create a new Contract instance for the Multi Sig Wallet
    let contract = new Contract(
      MULTI_SIG_WALLET_ADDRESS || '',
      MultiSigWallet.abi,
      provider.getSigner()
    ) as MultiSigWalletContract

    dispatch({ type: 'ADD_CONTRACT', payload: contract })

    // Check that the MetaMask is installed
    if (window.ethereum) {
      // Detect the account on MetaMask upon page reload
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then(async (accounts: string[]) => {
          dispatch({
            type: 'UPDATE_USER',
            payload: {
              address: accounts[0],
              balance: await getBalance(provider, accounts[0]),
            },
          })
        })
        .catch((err: Error) => console.error(err))

      // Detect when accounts are changed in MetaMask
      window.ethereum.on('accountsChanged', async (accounts: string[]) => {
        // Update transactions
        dispatch({
          type: 'ADD_TRANSACTIONS',
          payload: await getAllTransactions(contract, provider),
        })
        // Add event listerner to detect when accounts are changed in MetaMask
        dispatch({
          type: 'UPDATE_USER',
          payload: {
            address: accounts[0],
            balance: await getBalance(provider, accounts[0]),
          },
        })
      })
    } else {
      // Prompt user to install MetaMask
      // Todo: Show pop up message
      console.log('INSTALL METAMASK TO USE THIS DAPP!')
    }

    // Fetch initial data
    ;(async () => {
      // Create event listeners
      ContractEventListener(contract, provider, dispatch, 'SubmitTransaction')
      ContractEventListener(contract, provider, dispatch, 'ConfirmTransaction')
      ContractEventListener(contract, provider, dispatch, 'ExecuteTransaction')
      ContractEventListener(contract, provider, dispatch, 'RevokeConfirmation')
      ContractEventListener(contract, provider, dispatch, 'Deposit')

      dispatch({
        type: 'UPDATE_OWNERS',
        payload: {
          confirmationsRequired: await confirmationsRequired(contract),
          owners: await getOwners(contract),
        },
      })
      dispatch({
        type: 'UPDATE_BALANCES',
        payload: await getBalance(provider, contract.address),
      })
      dispatch({
        type: 'ADD_TRANSACTIONS',
        payload: await getAllTransactions(contract, provider),
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

export async function getStaticProps() {
  return {
    props: { MULTI_SIG_WALLET_ADDRESS: process.env.MULTI_SIG_WALLET_ADDRESS },
  }
}
