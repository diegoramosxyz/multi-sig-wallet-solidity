import { ethers } from 'ethers'

export async function getBalance(
  provider: ethers.providers.Web3Provider,
  address: string
) {
  // return the balance formated to ETH
  return ethers.utils.formatEther(await provider?.getBalance(address))
}
