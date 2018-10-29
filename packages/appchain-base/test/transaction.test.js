const {
  appchain,
  bytecode,
  privateKey,
  abi,
  tx
} = require('./config')

const inquireTx = (action = 'getTransactionReceipt') => txHash =>
  new Promise((resolve, reject) => {
    let remains = 10
    let interval = setInterval(() => {
      if (!remains) {
        clearInterval(interval)
        reject(new Error('No Result Received'))
      }
      remains--
      appchain.base[action](txHash).then(res => {
        if (res) {
          clearInterval(interval)
          resolve(res)
        }
      })
    }, 1000)
  })

test.skip('signTransaction', () => {
  //
})

test.skip('sendSignedTransaction', () => {
  //
})

test('sendTransaction, getTransactionReceipt, getTransactionProof, and getTransaction', async () => {
  expect.assertions(6)
  jest.setTimeout(30000)
  const currentHeight = await appchain.base.getBlockNumber()
  const result = await appchain.base.sendTransaction({
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

  const transactionResult = await appchain.base.getTransaction(result.hash)
  expect(transactionResult.hash).toBe(result.hash)

  return
})

test('transfer', async () => {
  expect.assertions(6)
  jest.setTimeout(30000)

  const to = '0xb4061fa8e18eeeeeeeeeeeeeeeeeeeeeeeeeeeee'
  const prevBalance = await appchain.base.getBalance(to)

  const currentHeight = await appchain.base.getBlockNumber()
  const result = await appchain.base.sendTransaction({
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
  const transactionResult = await appchain.base.getTransaction(result.hash)
  expect(transactionResult.hash).toBe(result.hash)
  const currentBalance = await appchain.base.getBalance(to)
  expect(+currentBalance).toBeGreaterThan(+prevBalance)
})

test.skip('sign', () => {
  //
})

test.skip('call', async () => {
  //
})

test('listen to transaction receipt', async () => {
  const currentHeight = await appchain.base.getBlockNumber()
  const result = await appchain.base.sendTransaction({
    ...tx,
    validUntilBlock: +currentHeight + 88
  })
  const receipt = await appchain.listene
  rs.listenToTransactionReceipt(result.hash)
  expect(receipt.transactionHash).toBe(result.hash)
})

test('store abi', async () => {
  appchain.eth.accounts.wallet.add(
    appchain.eth.accounts.privateKeyToAccount(privateKey)
  )
  const currentHeight = await appchain.base.getBlockNumber()
  const contractReuslt = await appchain.base.deploy(bytecode, {
    ...tx,
    validUntilBlock: +currentHeight + 88
  })
  const {
    contractAddress
  } = contractReuslt
  const receipt = await appchain.base.storeAbi(contractAddress, abi, {
    ...tx,
    validUntilBlock: +currentHeight + 88
  })

  const returnAbi = await appchain.base.getAbi(contractAddress)
  expect(JSON.stringify(returnAbi)).toBe(JSON.stringify(abi))
})
