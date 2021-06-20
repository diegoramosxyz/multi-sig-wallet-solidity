import { ethers } from 'ethers'
import { GlobalContext } from 'context/GlobalState'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'

export default function DepositEth() {
  const { register, handleSubmit } = useForm()

  const {
    state: { provider, contract, balances },
  } = useContext(GlobalContext)

  // The value comes from the input as ether
  async function onSubmit({ _value }: { _value: string }) {
    if (provider) {
      // https://docs.ethers.io/v5/api/providers/jsonrpc-provider/#JsonRpcProvider-send
      provider.send('eth_sendTransaction', [
        {
          from: await provider.getSigner().getAddress(),
          to: contract?.address,
          value: ethers.utils.parseEther(_value).toHexString(),
        },
      ])
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
      <header>Contract Balance: {balances.contract} ETH</header>
      <label htmlFor="_value" className="sr-only" />
      <input
        className="bg-trueGray-800 text-trueGray-100 block rounded mb-3 ring-1 px-3 py-2"
        {...register('_value', { required: true })}
        placeholder="Value in ETH"
      />
      <button className="rounded px-3 py-2 bg-green-800 text-white">
        Deposit ETH
      </button>
    </form>
  )
}
