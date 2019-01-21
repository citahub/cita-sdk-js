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
  const decodedLogs = ABICoder.decodeLog(abi, log.data || '', log.topics || [])
  return { ...log, decodedLogs }
}
