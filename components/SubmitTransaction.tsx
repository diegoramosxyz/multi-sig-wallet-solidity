import { useContext } from 'react'
import { ethers } from 'ethers'
import { GlobalContext } from 'context/GlobalState'

export default function CallContract() {
  const { state } = useContext(GlobalContext)
  let oneEth = ethers.utils.parseEther('1.0')

  async function submitTransaction() {
    let tx = await state.contract.submitTransaction(
      '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      oneEth,
      '0x'
    )
    console.log(tx)

    // Listen to the SubmitTransaction event
    state.contract.on(
      'SubmitTransaction',
      (owner: string, txIndex: number, to: string, value: any, data: string) =>
        console.log({
          owner,
          txIndex,
          to,
          value: value.toString(),
          data,
        })
    )
  }

  return (
    <button
      onClick={() => submitTransaction()}
      className="px-3 py-2 rounded bg-blue-800 text-white"
    >
      Submit Transaction
    </button>
  )
}
