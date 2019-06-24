const ABICoder = require('web3-eth-abi')

export interface Log {
  address: string
  topics: string[]
  data: string
  blockHash: string
  blockNumber: string
  transactionHash: string
  transactionIndex: string
  logIndex: string
  transactionLogIndex: string
}

export const LogParser = (log: Log | string, abi: any) => {
  if (typeof log === 'string') return log
  if (!abi) throw new Error('ABI Missed')
  if (abi.length === undefined) throw new Error('ABI must be type of array')
  const topics =
    abi.filter((input: { indexed: boolean }) => input.indexed).length ===
    log.topics.length
      ? log.topics
      : log.topics.slice(1)
  const decodedLogs = ABICoder.decodeLog(abi, log.data || '', topics)
  return { ...log, decodedLogs }
}
