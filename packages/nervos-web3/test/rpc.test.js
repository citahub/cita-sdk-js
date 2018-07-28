const {
  nervos,
  from,
  privateKey,
  tx
} = require('./config');

test('peerCount', async () => {
  const peerCount = await nervos.appchain.peerCount();
  expect(peerCount.startsWith('0x')).toBe(true);
});

test('getMetaData', async () => {
  const metadata = await nervos.appchain.getMetaData();
  expect(metadata.validators.length).toBeTruthy();
});

//TODO: getAbi

//TODO: getCode

test('getBalance', async () => {
  const balance = await nervos.appchain.getBalance(from);
  expect(typeof balance).toBe('string');
});


// TODO: getAccounts

test('getBlock', async () => {
  const blockFromNumber = await nervos.appchain.getBlock('0');
  expect(blockFromNumber.hash).toBeTruthy();

  const blockFromHash = await nervos.appchain.getBlock(blockFromNumber.hash);
  expect(blockFromHash.hash).toBe(blockFromNumber.hash);
});

test('getBlockByNumber and getBlockByHash', async () => {
  const blockFromNumber = await nervos.appchain.getBlockByNumber('0');
  expect(blockFromNumber.hash).toBeTruthy();

  const blockFromHash = await nervos.appchain.getBlockByHash(blockFromNumber.hash);
  expect(blockFromHash.hash).toBe(blockFromNumber.hash);
});

test('getBlockNumber', async () => {
  const blockNumber = await nervos.appchain.getBlockNumber();
  expect(blockNumber).toBeGreaterThan(0);
});

test.skip('getBlockTransactionCount', async () => {
  //
});

test('getTransactionCount', async () => {
  const number = await nervos.appchain.getTransactionCount(from);
  expect(number).toBeGreaterThanOrEqual(0);
});

test('newMessageFilter', async () => {
  const topics = {
    topics: [
      '0x8fb1356be6b2a4e49ee94447eb9dcb8783f51c41dcddfe7919f945017d163bf3'
    ]
  };
  const filterId = await nervos.appchain.newMessageFilter(topics);
  expect(filterId.startsWith('0x')).toBe(true);
});

test('newBlockFilter', async () => {
  const filterId = await nervos.appchain.newBlockFilter();
  expect(filterId.startsWith('0x')).toBe(true);
});

test('getFilterChagnes', async () => {
  const filterId = await nervos.appchain.newBlockFilter();
  const changes = await nervos.appchain.getFilterChanges(filterId);
  expect(Array.isArray(changes)).toBe(true);
});

test('getFilterLogs', async () => {
  const filterId = await nervos.appchain.newBlockFilter();
  const changes = await nervos.appchain.getFilterLogs(filterId);
  expect(Array.isArray(changes)).toBe(true);
});


test('deleteMessageFilter', async () => {
  const filterId = await nervos.appchain.newBlockFilter();
  const success = await nervos.appchain.deleteMessageFilter(filterId);
  expect(success).toBe(true);
});
