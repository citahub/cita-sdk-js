const { citaSDK } = require('./config')

const standardPrivateKey = citaSDK.base.accounts.create().privateKey
const standardPrivateKeyWithout0x = standardPrivateKey.slice(2)

const emptyPrivateKey = ''
const shortPrivateKey = standardPrivateKey.slice(0, -1)
const longPrivateKey = standardPrivateKey + '0'
const invalidHexPrivateKey = shortPrivateKey + 'g'

test('private key is empty', () => {
  const valid = citaSDK.utils.isPrivateKey(emptyPrivateKey)
  expect(valid).toBe(false)
})
test('private key is too short', () => {
  const valid = citaSDK.utils.isPrivateKey(shortPrivateKey)
  expect(valid).toBe(false)
})
test('private key is too long', () => {
  const valid = citaSDK.utils.isPrivateKey(longPrivateKey)
  expect(valid).toBe(false)
})
test('standard private key is right', () => {
  const valid = citaSDK.utils.isPrivateKey(standardPrivateKey)
  expect(valid).toBe(true)
})

test('standard private key without 0x is right', () => {
  const valid = citaSDK.utils.isPrivateKey(standardPrivateKeyWithout0x)
  expect(valid).toBe(true)
})

test('invalid hex private key', () => {
  const valid = citaSDK.utils.isPrivateKey(invalidHexPrivateKey)
  expect(valid).toBe(false)
})
