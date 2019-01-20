const { citaSDK, from, privateKey, tx } = require('./config')

test('peerCount', async () => {
  const peerCount = await citaSDK.base.peerCount()
  expect(peerCount.startsWith('0x')).toBe(true)
})

test('getMetaData', async () => {
  const metadata = await citaSDK.base.getMetaData()
  expect(metadata.validators.length).toBeTruthy()
})

//TODO: getAbi

//TODO: getCode

test('getBalance', async () => {
  const balance = await citaSDK.base.getBalance(from)
  expect(typeof balance).toBe('string')
})

// TODO: getAccounts

test('getBlock', async () => {
  const blockFromNumber = await citaSDK.base.getBlock('latest')
  expect(blockFromNumber.hash).toBeTruthy()

  const blockFromHash = await citaSDK.base.getBlock(blockFromNumber.hash)
  expect(blockFromHash.hash).toBe(blockFromNumber.hash)
})

test('getBlockByNumber and getBlockByHash', async () => {
  const blockFromNumber = await citaSDK.base.getBlockByNumber('latest')
  expect(blockFromNumber.hash).toBeTruthy()

  const blockFromHash = await citaSDK.base.getBlockByHash(blockFromNumber.hash)
  expect(blockFromHash.hash).toBe(blockFromNumber.hash)
})

test('getBlockNumber', async () => {
  const blockNumber = await citaSDK.base.getBlockNumber()
  expect(blockNumber).toBeGreaterThan(0)
})

test.skip('getBlockTransactionCount', async () => {
  //
})

test('getTransactionCount', async () => {
  const number = await citaSDK.base.getTransactionCount(from)
  expect(number).toBeGreaterThanOrEqual(0)
})

test.skip('getLogs', async () => {
  // TODO: getLogs
  // const logs = await citaSDK.base.getLogs({
  // address:
  // })
})

test('newMessageFilter', async () => {
  const topics = {
    topics: [
      '0x8fb1356be6b2a4e49ee94447eb9dcb8783f51c41dcddfe7919f945017d163bf3'
    ]
  }
  const filterId = await citaSDK.base.newMessageFilter(topics)
  expect(filterId.startsWith('0x')).toBe(true)
})

test('newBlockFilter', async () => {
  const filterId = await citaSDK.base.newBlockFilter()
  expect(filterId.startsWith('0x')).toBe(true)
})

test('getFilterChagnes', async () => {
  const filterId = await citaSDK.base.newBlockFilter()
  const changes = await citaSDK.base.getFilterChanges(filterId)
  expect(Array.isArray(changes)).toBe(true)
})

test('getFilterLogs', async () => {
  const filterId = await citaSDK.base.newBlockFilter()
  const changes = await citaSDK.base.getFilterLogs(filterId)
  expect(Array.isArray(changes)).toBe(true)
})

test('deleteMessageFilter', async () => {
  const filterId = await citaSDK.base.newBlockFilter()
  const changes = await citaSDK.base.getFilterLogs(filterId)
  const success = await citaSDK.base.deleteMessageFilter(filterId)
  expect(success).toBe(true)
})
