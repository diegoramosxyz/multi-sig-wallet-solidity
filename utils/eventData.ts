import { ethers } from 'ethers'
import { owners } from './contractMethods'

export async function getTransactions(contract: ethers.Contract) {
  // @ts-ignore
  // queryFilter has the wrong type. Report.
  let res = await contract.queryFilter('SubmitTransaction')

  return res.map((events) => {
    if (events.args) {
      let { args } = events
      return {
        owner: args['owner'],
        // https://docs.ethers.io/v5/api/utils/bignumber/#BigNumber--BigNumber--methods--conversion
        txIndex: args['txIndex'].toNumber(),
        to: args['to'],
        value: ethers.utils.formatEther(args['value']),
        data: args['data'],
      }
    }
  })
}

export async function getBalance(
  provider: ethers.providers.Web3Provider,
  address: string
) {
  const BNBalance = await provider?.getBalance(address)
  // return the balance formated to ETH
  return BNBalance && ethers.utils.formatEther(BNBalance)
}

export async function getOwners(contract: ethers.Contract) {
  let arr = []
  // TODO: Get the length of owners array
  for (let i = 0; i < 3; i++) {
    arr.push(await owners(contract, i))
  }
  return arr
}
