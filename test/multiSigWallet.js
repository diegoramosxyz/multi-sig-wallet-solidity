const { expect } = require('chai')
const {
  ethers: { utils, getSigners, getContractFactory },
} = require('hardhat')

// Make a transaction human readable
function parseTx(tx) {
  return {
    to: tx['to'],
    value: utils.formatEther(tx['value']),
    data: tx['data'],
    executed: tx['executed'],
    numConfirmations: +tx['numConfirmations'].toString(),
  }
}

describe('Multi-Sig Wallet', () => {
  let tenEth = utils.parseEther('10.0')
  let oneEth = utils.parseEther('1.0')
  let accounts

  before(async () => {
    accounts = await getSigners()
    Factory = await getContractFactory('MultiSigWallet')
    TestContract = await getContractFactory('TestContract')
    testContract = await TestContract.deploy()
    contract = await Factory.deploy(
      [accounts[0].address, accounts[1].address, accounts[2].address],
      2
    )
  })

  it('Deposits 10 ETH to the Multi-Sig Wallet', async () => {
    let tx = await contract.deposit({ value: tenEth })
    // Wait for the transaction to be mined and emit events
    let { events } = await tx.wait()
    let amount = events[0].args['amount']

    // Expect the ether emitted in the event to equal the ether sent
    expect(utils.formatEther(amount)).equals('10.0')
  })

  it('Confirms and executes a transaction', async () => {
    // Send 1 ETH to account 3
    await contract.submitTransaction(accounts[3].address, oneEth, '0x')

    // Get the transaction from the transactions array
    let tx0 = parseTx(await contract.transactions(0))

    // The transaction was confirmed twice and revoked once
    // Thus the number of confirmations should be 1
    expect(tx0.value).equals('1.0')
    expect(tx0.numConfirmations).equals(0)
    expect(tx0.executed).equals(false)

    console.log('Transaction before execution and confirmation\n', tx0, '\n')

    // https://hardhat.org/guides/waffle-testing.html?#testing-from-a-different-account
    // Use the connect() method to sign transaction using another account
    // Confirm transaction at index 0 created by account 0
    // from account 1 and account 2
    await contract.connect(accounts[1]).confirmTransaction(0)
    await contract.connect(accounts[2]).confirmTransaction(0)

    console.log(
      'Account 3 balance before execution\n',
      utils.formatEther(await accounts[3].getBalance()),
      ' ETH\n'
    )

    await contract.executeTransaction(0)

    // Get the transaction from the transactions array
    tx0 = parseTx(await contract.transactions(0))

    expect(tx0.numConfirmations).equals(2)
    expect(tx0.executed).equals(true)

    console.log('Transaction after confirmation and execution\n', tx0, '\n')

    console.log(
      'Account 3 balance after execution\n',
      utils.formatEther(await accounts[3].getBalance()),
      ' ETH'
    )
  })

  it('Confirms and revokes a transaction', async () => {
    // Send 1 ETH to account 2
    await contract.submitTransaction(accounts[2].address, oneEth, '0x')

    // Confirm transaction at index 1
    await contract.connect(accounts[1]).confirmTransaction(1)
    await contract.connect(accounts[2]).confirmTransaction(1)

    // Revoke (Undo) confirmation of transaction at index 1
    await contract.connect(accounts[1]).revokeConfirmation(1)

    // Get the transaction from the transactions array
    let tx1 = parseTx(await contract.transactions(1))

    // The transaction was confirmed twice and revoked once
    // Thus the number of confirmations should be 1
    expect(tx1.numConfirmations).equals(1)
  })

  it('Confirms and executes a transaction to execute function in another contract', async () => {
    // Get the data in hex form to call the 'CallMe' function
    let data = await testContract.getData()

    // Send 0 ETH and data to execute function in TestContract
    await contract.submitTransaction(testContract.address, 0, data)

    // Get the transaction from the transactions array
    let tx2 = parseTx(await contract.transactions(2))

    // The transaction was confirmed twice and revoked once
    // Thus the number of confirmations should be 1
    expect(tx2.value).equals('0.0')
    expect(tx2.numConfirmations).equals(0)
    expect(tx2.executed).equals(false)

    console.log('Transaction before execution and confirmation\n', tx2, '\n')

    // https://hardhat.org/guides/waffle-testing.html?#testing-from-a-different-account
    // Use the connect() method to sign transaction using another account
    // Confirm transaction at index 0 created by account 0
    // from account 1 and account 2
    await contract.connect(accounts[1]).confirmTransaction(2)
    await contract.connect(accounts[2]).confirmTransaction(2)

    let i = +`${await testContract.i()}`

    console.log('Test contract variable i before execution\n', 'i = ', i, '\n')

    await contract.executeTransaction(2)

    // Get the transaction from the transactions array
    tx2 = parseTx(await contract.transactions(2))

    expect(tx2.numConfirmations).equals(2)
    expect(tx2.executed).equals(true)

    console.log('Transaction after confirmation and execution\n', tx2, '\n')

    i = +`${await testContract.i()}`

    console.log('Test contract variable i after execution\n', 'i = ', i)
  })
})
