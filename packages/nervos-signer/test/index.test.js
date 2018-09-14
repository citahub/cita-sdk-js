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

test('sign with nonce', () => {
  const txWithNonce = {
     ...tx,
     nonce: "12345",
     validUntilBlock: 999999
  }
  const signedMsg = sign(txWithNonce, privateKey)
  expect(signedMsg).toBe("0x0aa6021205313233343518c0843d20bf843d2af0016060604052341561000f57600080fd5b60d38061001d6000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c14606e575b600080fd5b3415605857600080fd5b606c60048080359060200190919050506094565b005b3415607857600080fd5b607e609e565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a723058202d9a0979adf6bf48461f24200e635bc19cd1786efbcfc0608eb1d76114d4058600293220000000000000000000000000000000000000000000000000000000000000000038011241c7b51f2b634a2bb6acb0956a11f71889a88c4bbac2098b39bc3c5c0e151b45931217c0d1e30c1bec872e619273003098e453332c89690b0670fb02a35a53808e00")
})

test('unsign', () => {
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
