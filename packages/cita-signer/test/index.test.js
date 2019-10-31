const { CryptoTx }  = require ("../lib/enum");

const {
  citaSDK,
  tx,
  from,
  privateKey,
} = require('./config')

const sign = require('../lib').default
const unsign = require('../lib/unsigner').default

const MAX_VALUE = '0x' + 'f'.repeat(32)

const inquireReceipt = txHash =>
  new Promise((resolve, reject) => {
    let remains = 10
    let interval = setInterval(() => {
      if (!remains) {
        clearInterval(interval)
        reject(new Error('No Receipt Received'))
      }
      remains--
      citaSDK.base.getTransactionReceipt(txHash).then(receipt => {
        if (receipt && receipt.transactionHash) {
          clearInterval(interval)
          resolve(receipt)
        }
      })
    }, 1000)
  })

test('sendTransaction with internal key, getTransactionReceipt, and getTransaction', async () => {
  expect.assertions(15)
  jest.setTimeout(30000)
  const currentHeight = await citaSDK.base.getBlockNumber()

  const signedMsg = sign({
    ...tx,
    validUntilBlock: +currentHeight + 88,
    privateKey,
  })

  const result = await citaSDK.base.sendSignedTransaction(signedMsg)
  expect(result.status).toBe('OK')
  expect(result.hash.startsWith('0x')).toBe(true)
  if (!result.hash) {
    return new Error('No TxHash Received')
  }
  const receipt = await inquireReceipt(result.hash)
  expect(receipt.transactionHash).toBe(result.hash)
  expect(receipt.errorMessages).not.toBeNull()
  //TODO: getTransactionProof
  const transactionResult = await citaSDK.base.getTransaction(result.hash)
  expect(transactionResult.hash).toBe(result.hash)
  return
})

test('sendTransaction with external key, getTransactionReceipt, and getTransaction', async () => {
  expect.assertions(5)
  jest.setTimeout(30000)
  const currentHeight = await citaSDK.base.getBlockNumber()
  const signedMsg = sign({
    ...tx,
    validUntilBlock: +currentHeight + 88,
  }, privateKey)
  const result = await citaSDK.base.sendSignedTransaction(signedMsg)
  expect(result.status).toBe('OK')
  expect(result.hash.startsWith('0x')).toBe(true)

  if (!result.hash) {
    return new Error('No TxHash Received')
  }

  const receipt = await inquireReceipt(result.hash)

  expect(receipt.transactionHash).toBe(result.hash)
  expect(receipt.errorMessages).not.toBeNull()
  //TODO: getTransactionProof
  const transactionResult = await citaSDK.base.getTransaction(result.hash)
  expect(transactionResult.hash).toBe(result.hash)
  return
})

describe('tests for cita v0', () => {
  if (process.env.VERSION !== '0') return
  test('sign with nonce', () => {
    const txWithNonce = {
      ...tx,
      nonce: '12345',
      validUntilBlock: 999999,
    }
    const signedMsg = sign(txWithNonce, privateKey)
    expect(signedMsg).toBe(
      '0x0aa6021205313233343518c0843d20bf843d2af0016060604052341561000f57600080fd5b60d38061001d6000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c14606e575b600080fd5b3415605857600080fd5b606c60048080359060200190919050506094565b005b3415607857600080fd5b607e609e565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a723058202d9a0979adf6bf48461f24200e635bc19cd1786efbcfc0608eb1d76114d4058600293220000000000000000000000000000000000000000000000000000000000000000038011241c7b51f2b634a2bb6acb0956a11f71889a88c4bbac2098b39bc3c5c0e151b45931217c0d1e30c1bec872e619273003098e453332c89690b0670fb02a35a53808e00',
    )
  })

  test('sign another with nonce', () => {
    const txWithNonce = {
      ...tx,
      nonce: '57a4558948eb422bab36f1ca0f0354e7',
      validUntilBlock: 1470441,
    }
    const signedMsg = sign(txWithNonce, privateKey)
    expect(signedMsg).toBe(
      '0x0ac1021220353761343535383934386562343232626162333666316361306630333534653718c0843d20e9df592af0016060604052341561000f57600080fd5b60d38061001d6000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c14606e575b600080fd5b3415605857600080fd5b606c60048080359060200190919050506094565b005b3415607857600080fd5b607e609e565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a723058202d9a0979adf6bf48461f24200e635bc19cd1786efbcfc0608eb1d76114d40586002932200000000000000000000000000000000000000000000000000000000000000000380112410167c108d0919a02a43219e3a52fe3cddbe0ac8b9d2271f429c2b09cdad481536596976aa166e66d2b30451a54e1a405bfbc5780538abf0caedbddd4dcbf732200',
    )
  })
})

describe('unsign', () => {
  const signedMsg = sign({
    ...tx,
    to: from
  }, privateKey)
  const {
    transaction,
    crypto,
    sender
  } = unsign(signedMsg)
  expect(transaction.to).toBe(from.toLowerCase())
  expect(transaction.validUntilBlock).toBe(tx.validUntilBlock)
  expect(transaction.version.toString()).toBe(tx.version)
  expect(+transaction.chainId).toBe(+tx.chainId)
  expect(sender.address).toBe(from.toLowerCase())
})

describe('Error Handler', () => {
  test(`value larger than ${MAX_VALUE} should throw error`, () => {
    expect.assertions(1)
    const _tx = {
      ...tx,
      privateKey,
      value: '0x' + (+MAX_VALUE + 1).toString(16),
    }
    try {
      sign(_tx)
    } catch (err) {
      expect(err).toEqual(new Error(`Value should not be larger than ${MAX_VALUE}`))
    }
  })
})

describe('test for sm2', ()  => {
  const sm2Account = citaSDK.eth.accounts.privateKeyToAccount(privateKey, CryptoTx.SM2);
  tx.from = sm2Account.address
  const signedMsg = sign({
    ...tx,
    to: from,
    cryptoTx: CryptoTx.SM2
  }, privateKey)
  const {
    transaction,
    crypto,
    sender
  } = unsign(signedMsg, CryptoTx.SM2)
  expect(transaction.to).toBe(from.toLowerCase())
  expect(transaction.validUntilBlock).toBe(tx.validUntilBlock)
  expect(transaction.version.toString()).toBe(tx.version)
  expect(+transaction.chainId).toBe(+tx.chainId)
  expect(sender.address).toBe(sm2Account.address.toLowerCase())
})
