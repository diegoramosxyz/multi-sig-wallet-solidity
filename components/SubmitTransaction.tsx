import { Fragment, useContext } from 'react'
import { ethers } from 'ethers'
import { GlobalContext } from 'context/GlobalState'
import { useForm } from 'react-hook-form'

export default function CallContract() {
  const { register, handleSubmit } = useForm()
  const {
    state: { contract },
  } = useContext(GlobalContext)

  async function onSubmit({
    _to,
    _value,
    _data,
  }: {
    _to: string
    _value: string
    _data: string
  }) {
    if (contract) {
      await contract.submitTransaction(
        _to,
        // Convert a stringified number into a BigNumber type
        // https://docs.ethers.io/v5/api/utils/display-logic/#utils-formatEther
        ethers.utils.parseEther(_value),
        _data
      )
    }
  }

  return (
    <Fragment>
      <p>Submit a transaction</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
        <label htmlFor="_to" className="sr-only" />
        <input
          className="bg-trueGray-800 text-trueGray-100 block rounded mb-3 ring-1 px-3 py-2"
          {...register('_to', { required: true })}
          placeholder="To"
        />
        <label htmlFor="_value" className="sr-only" />
        <input
          className="bg-trueGray-800 text-trueGray-100 block rounded mb-3 ring-1 px-3 py-2"
          {...register('_value', { required: true })}
          placeholder="Value in ETH"
        />
        <label htmlFor="_data" className="sr-only" />
        <input
          className="bg-trueGray-800 text-trueGray-100 block rounded mb-3 ring-1 px-3 py-2"
          {...register('_data', { required: true })}
          placeholder="Data"
          defaultValue="0x"
        />

        <button className="px-3 py-2 rounded bg-blue-800 text-white">
          Submit Transaction
        </button>
      </form>
    </Fragment>
  )
}
