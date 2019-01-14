const { citaSDK, bytecode, privateKey, abi, tx } = require('./config')

const inquireTx = (action = 'getTransactionReceipt') => txHash =>
  new Promise((resolve, reject) => {
    let remains = 10
    let interval = setInterval(() => {
      if (!remains) {
        clearInterval(interval)
        reject(new Error('No Result Received'))
      }
      remains--
      citaSDK.base[action](txHash).then(res => {
        if (res) {
          clearInterval(interval)
          resolve(res)
        }
      })
    }, 1000)
  })

test.skip('signTransaction', () => {})

test.skip('sendSignedTransaction', () => {})

test('sendTransaction, getTransactionReceipt, getTransactionProof, and getTransaction', async () => {
  expect.assertions(7)
  jest.setTimeout(30000)
  const currentHeight = await citaSDK.base.getBlockNumber()
  const result = await citaSDK.base.sendTransaction({
    ...tx,
    validUntilBlock: +currentHeight + 88
  })
  expect(result.status).toBe('OK')
  expect(result.hash.startsWith('0x')).toBe(true)

  if (!result.hash) {
    return new Error('No TxHash Received')
  }

  const receipt = await inquireTx('getTransactionReceipt')(result.hash)

  expect(receipt.transactionHash).toBe(result.hash)
  expect(receipt.errorMessages).not.toBeNull()

  const proof = await inquireTx('getTransactionProof')(result.hash)
  expect(proof).not.toBeNull()

  const transactionResult = await citaSDK.base.getTransaction(result.hash)
  expect(transactionResult.hash).toBe(result.hash)
  expect(
    transactionResult.unsignedTransaction.sender.address.replace(/^0x/, '')
  ).toBe(
    citaSDK.base.accounts.wallet[0].address.toLowerCase().replace(/^0x/, '')
  )
  return
})

test('transfer', async () => {
  expect.assertions(6)
  jest.setTimeout(30000)

  const to = '0xb4061fa8e18eeeeeeeeeeeeeeeeeeeeeeeeeeeee'
  const prevBalance = await citaSDK.base.getBalance(to, 'pending')

  const currentHeight = await citaSDK.base.getBlockNumber()
  const result = await citaSDK.base.sendTransaction({
    ...tx,
    validUntilBlock: +currentHeight + 88,
    data: '',
    value: '0xff',
    to
  })
  expect(result.status).toBe('OK')
  expect(result.hash.startsWith('0x')).toBe(true)

  if (!result.hash) {
    return new Error('No TxHash Received')
  }

  const receipt = await inquireTx('getTransactionReceipt')(result.hash)

  expect(receipt.transactionHash).toBe(result.hash)
  expect(receipt.errorMessages).not.toBeNull()
  //TODO: getTransactionProof
  const transactionResult = await citaSDK.base.getTransaction(result.hash)
  expect(transactionResult.hash).toBe(result.hash)
  const currentBalance = await citaSDK.base.getBalance(to, 'pending')
  expect(+currentBalance).toBeGreaterThan(+prevBalance)
})

test.skip('sign', () => {})

test.skip('call', async () => {})

test('listen to transaction receipt', async () => {
  const currentHeight = await citaSDK.base.getBlockNumber()
  const result = await citaSDK.base.sendTransaction({
    ...tx,
    validUntilBlock: +currentHeight + 88
  })
  const receipt = await citaSDK.listeners.listenToTransactionReceipt(
    result.hash
  )
  expect(receipt.transactionHash).toBe(result.hash)
})

test('store abi', async () => {
  const currentHeight = await citaSDK.base.getBlockNumber()
  const myContract = new citaSDK.base.Contract(abi)
  const _tx = Object.assign({}, tx, {
    validUntilBlock: +currentHeight + 88
  })
  const txResult = await myContract
    .deploy({
      data: bytecode,
      arguments: []
    })
    .send(_tx)
  const receipt = await citaSDK.listeners.listenToTransactionReceipt(
    txResult.hash
  )
  const txReceipt = await citaSDK.base.storeAbi(
    receipt.contractAddress,
    abi,
    _tx
  )
  const returnAbi = await citaSDK.base.getAbi(
    receipt.contractAddress,
    'pending'
  )
  expect(JSON.stringify(returnAbi)).toBe(JSON.stringify(abi))
})
