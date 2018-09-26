const {
  nervos,
} = require('./config')

const standardPrivateKey = nervos.appchain.accounts.create().privateKey
const standardPrivateKeyWithout0x = standardPrivateKey.slice(2)

const emptyPrivateKey = ''
const shortPrivateKey = standardPrivateKey.slice(0, -1)
const longPrivateKey = standardPrivateKey + '0'
const invalidHexPrivateKey = shortPrivateKey + 'g'

test('private key is empty', () => {
  const valid = nervos.utils.isPrivateKey(emptyPrivateKey)
  expect(valid).toBe(false)
})
test('private key is too short', () => {
  const valid = nervos.utils.isPrivateKey(shortPrivateKey)
  expect(valid).toBe(false)
})
test('private key is too long', () => {
  const valid = nervos.utils.isPrivateKey(longPrivateKey)
  expect(valid).toBe(false)
})
test('standard private key is right', () => {
  const valid = nervos.utils.isPrivateKey(standardPrivateKey)
  expect(valid).toBe(true)
})

test('standard private key without 0x is right', () => {
  const valid = nervos.utils.isPrivateKey(standardPrivateKeyWithout0x)
  expect(valid).toBe(true)
})

test('invalid hex private key', () => {
  const valid = nervos.utils.isPrivateKey(invalidHexPrivateKey)
  expect(valid).toBe(false)
})
