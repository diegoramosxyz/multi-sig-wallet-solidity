import { ethers } from 'ethers'

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

export async function updateUser(
  provider: ethers.providers.Web3Provider,
  address: string
) {
  const BNBalance = await provider?.getBalance(address)
  let balance
  BNBalance && (balance = ethers.utils.formatEther(BNBalance))
  return {
    address,
    balance,
  }
}
