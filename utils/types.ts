import { ethers } from 'ethers'

type transaction = {
  to: string
  value: ethers.BigNumber
  data: string
  executed: boolean
  numConfirmations: ethers.BigNumber
}

export interface MultiSigWalletContract extends ethers.Contract {
  owners(index: ethers.BigNumber): Promise<string>
  isOwner(address: string): Promise<boolean>
  numConfirmationsRequired(): Promise<ethers.BigNumber>
  isConfirmed(index: ethers.BigNumber, address: string): Promise<boolean>
  transactions(index: ethers.BigNumber): Promise<transaction>
  submitTransaction(
    _to: string,
    _value: ethers.BigNumber,
    _data: string
  ): Promise<ethers.Transaction>
  confirmTransaction(_txIndex: ethers.BigNumber): Promise<ethers.Transaction>
  executeTransaction(_txIndex: ethers.BigNumber): Promise<ethers.Transaction>
  revokeConfirmation(_txIndex: ethers.BigNumber): Promise<ethers.Transaction>
  getTransactionCount(): Promise<ethers.BigNumber>
}
