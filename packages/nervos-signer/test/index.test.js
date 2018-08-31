const {
  nervos,
  tx,
  from,
  privateKey
} = require('./config')

const sign = require('../lib').default
const unsign = require('../lib').unsigner


const inquireReceipt = txHash => new Promise((resolve, reject) => {
  let remains = 10
  let interval = setInterval(() => {
    if (!remains) {
      clearInterval(interval)
      reject(new Error('No Receipt Received'))
    }
    remains--
    nervos.appchain.getTransactionReceipt(txHash).then(receipt => {
      if (receipt && receipt.transactionHash) {
        clearInterval(interval)
        resolve(receipt)
      }
    })
  }, 1000)
})

test('sendTransaction with internal key, getTransactionReceipt, and getTransaction', async () => {
  expect.assertions(5)
  jest.setTimeout(30000)
  const currentHeight = await nervos.appchain.getBlockNumber()
  const signedMsg = sign({ ...tx,
    validUntilBlock: +currentHeight + 88,
    privateKey
  })
  const result = await nervos.appchain.sendSignedTransaction(signedMsg)
  console.log('sendTransaction Returns: ')
  console.log(result)
  expect(result.status).toBe('OK')
  expect(result.hash.startsWith('0x')).toBe(true)

  if (!result.hash) {
    return new Error('No TxHash Received')
  }

  const receipt = await inquireReceipt(result.hash)
  console.log('receipt: ')
  console.log(receipt)

  expect(receipt.transactionHash).toBe(result.hash)
  expect(receipt.errorMessages).not.toBeNull()
  //TODO: getTransactionProof
  const transactionResult = await nervos.appchain.getTransaction(result.hash)
  expect(transactionResult.hash).toBe(result.hash)
  // console.log('------------------')
  // console.log('signedMsg')
  // console.log(signedMsg)
  // console.log('------------------')
  // console.log('content')
  // console.log(transactionResult.content)
  console.log('------------------')
  console.log('transaction result')
  console.log(transactionResult)
  return
})

test('sendTransaction with external key, getTransactionReceipt, and getTransaction', async () => {
  expect.assertions(5)
  jest.setTimeout(30000)
  const currentHeight = await nervos.appchain.getBlockNumber()
  const signedMsg = sign({ ...tx,
    validUntilBlock: +currentHeight + 88
  }, privateKey)
  const result = await nervos.appchain.sendSignedTransaction(signedMsg)
  console.log('sendTransaction Returns: ')
  console.log(result)
  expect(result.status).toBe('OK')
  expect(result.hash.startsWith('0x')).toBe(true)

  if (!result.hash) {
    return new Error('No TxHash Received')
  }

  const receipt = await inquireReceipt(result.hash)
  console.log('receipt: ')
  console.log(receipt)

  expect(receipt.transactionHash).toBe(result.hash)
  expect(receipt.errorMessages).not.toBeNull()
  //TODO: getTransactionProof
  const transactionResult = await nervos.appchain.getTransaction(result.hash)
  expect(transactionResult.hash).toBe(result.hash)
  console.log('transaction result')
  console.log(transactionResult)
  return
})
test.skip('unsign', () => {

  const signedMsg = sign(tx, privateKey)
  console.log('signed msg')
  console.log(signedMsg)
  const {
    transaction,
    // signature,
    crypto,
    // publicKey,
    sender
  } = unsign(signedMsg)
  expect(transaction.to).toBe('')
  expect(transaction.validUntilBlock).toBe(tx.validUntilBlock)
  expect(transaction.version).toBe(tx.version)
  expect(transaction.chainId).toBe(tx.chainId)
  expect(crypto).toBe(0)
  expect(sender.address).toBe(from.slice(2).toLowerCase())
})
