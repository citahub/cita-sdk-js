const {
  appchain,
  from,
  privateKey,
  tx
} = require('./config');

test('peerCount', async () => {
  const peerCount = await appchain.base.peerCount();
  expect(peerCount.startsWith('0x')).toBe(true);
});

test('getMetaData', async () => {
  const metadata = await appchain.base.getMetaData();
  expect(metadata.validators.length).toBeTruthy();
});

//TODO: getAbi

//TODO: getCode

test('getBalance', async () => {
  const balance = await appchain.base.getBalance(from);
  expect(typeof balance).toBe('string');
});


// TODO: getAccounts

test('getBlock', async () => {
  const blockFromNumber = await appchain.base.getBlock('latest');
  expect(blockFromNumber.hash).toBeTruthy();

  const blockFromHash = await appchain.base.getBlock(blockFromNumber.hash);
  expect(blockFromHash.hash).toBe(blockFromNumber.hash);
});

test('getBlockByNumber and getBlockByHash', async () => {
  const blockFromNumber = await appchain.base.getBlockByNumber('latest');
  expect(blockFromNumber.hash).toBeTruthy();

  const blockFromHash = await appchain.base.getBlockByHash(blockFromNumber.hash);
  expect(blockFromHash.hash).toBe(blockFromNumber.hash);
});

test('getBlockNumber', async () => {
  const blockNumber = await appchain.base.getBlockNumber();
  expect(blockNumber).toBeGreaterThan(0);
});

test.skip('getBlockTransactionCount', async () => {
  //
});

test('getTransactionCount', async () => {
  const number = await appchain.base.getTransactionCount(from);
  expect(number).toBeGreaterThanOrEqual(0);
});

test.skip('getLogs', async () => {
  // TODO: getLogs
  // const logs = await appchain.base.getLogs({
  // address: 
  // })
})

test('newMessageFilter', async () => {
  const topics = {
    topics: [
      '0x8fb1356be6b2a4e49ee94447eb9dcb8783f51c41dcddfe7919f945017d163bf3'
    ]
  };
  const filterId = await appchain.base.newMessageFilter(topics);
  expect(filterId.startsWith('0x')).toBe(true);
});

test('newBlockFilter', async () => {
  const filterId = await appchain.base.newBlockFilter();
  expect(filterId.startsWith('0x')).toBe(true);
});

test('getFilterChagnes', async () => {
  const filterId = await appchain.base.newBlockFilter();
  const changes = await appchain.base.getFilterChanges(filterId);
  expect(Array.isArray(changes)).toBe(true);
});

test('getFilterLogs', async () => {
  const filterId = await appchain.base.newBlockFilter();
  const changes = await appchain.base.getFilterLogs(filterId);
  expect(Array.isArray(changes)).toBe(true);
});


test('deleteMessageFilter', async () => {
  const filterId = await appchain.base.newBlockFilter();
  const success = await appchain.base.deleteMessageFilter(filterId);
  expect(success).toBe(true);
});
