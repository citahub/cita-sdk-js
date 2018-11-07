import * as outputFormatter from '../utils/outputFormatters'
export declare const peerCount: {
  name: string
  call: string
  params: number
}
export declare const getMetaData: {
  name: string
  call: string
  params: number
  inputFormatter: any[]
}
export declare const getAbi: {
  name: string
  call: string
  params: number
  inputFormatter: any[]
  outputFormatter: (_abi: string) => any
}
export declare const getTransactionReceipt: {
  name: string
  call: string
  params: number
  outputFormatter: any
}
export declare const getCode: {
  name: string
  call: string
  params: number
  inputFormatter: any[]
}
export declare const getAccounts: {
  name: string
  call: string
  params: number
  outputFormatter: any
}
export declare const getBalance: {
  name: string
  call: string
  params: number
  inputFormatter: any[]
  outputFormatter: any
}
export declare const getBlock: {
  name: string
  call: (args: any) => 'getBlockByHash' | 'getBlockByNumber'
  params: number
  inputFormatter: any[]
  outputFormatter: any
}
export declare const getBlockByHash: {
  name: string
  call: string
  params: number
  inputFormatter: any[]
  outputFormatter: any
}
export declare const getBlockByNumber: {
  name: string
  call: string
  params: number
  inputFormatter: any[]
  outputFormatter: any
}
export declare const getBlockNumber: {
  name: string
  call: string
  params: number
  outputFormatter: any
}
export declare const getBlockTransactionCount: {
  name: string
  call: (
    args: any
  ) => 'getBlockTransactionCountByHash' | 'getBlockTransactionCountByNumber'
  params: number
  inputFormatter: any[]
  outputFormatter: any
}
export declare const getTransaction: {
  name: string
  call: string
  params: number
  inputFormatter: null[]
  outputFormatter: (
    rpcTx: outputFormatter.RPC.getTransactionResult
  ) => {
    unsignedTransaction: any
    blockHash: string
    blockNumber: string
    content: string
    hash: string
    index: string
  }
}
export declare const getTransactionCount: {
  name: string
  call: string
  params: number
  inputFormatter: any[]
  outputFormatter: any
}
export declare const getTransactionProof: {
  name: string
  call: string
  params: number
}
export declare const sendSignedTransaction: {
  name: string
  call: string
  params: number
  inputFormatter: null[]
}
export declare const signTransaction: {
  name: string
  call: string
  params: number
  inputFormatter: ((
    {
      from,
      privateKey,
      data,
      nonce,
      quota,
      validUntilBlock,
      value,
      version,
      chainId,
      to
    }: {
      from: string
      privateKey: string
      data?: string | undefined
      nonce: string
      quota: number
      validUntilBlock: string | number
      value: string | number
      version?: number | undefined
      chainId: number
      to?: string | undefined
    },
    externalKey?: string | undefined
  ) => any)[]
}
export declare const sendTransaction: {
  name: string
  call: (args: any) => 'sendRawTransaction' | 'sendTransaction'
  params: number
  inputFormatter: ((
    {
      from,
      privateKey,
      data,
      nonce,
      quota,
      validUntilBlock,
      value,
      version,
      chainId,
      to
    }: {
      from: string
      privateKey: string
      data?: string | undefined
      nonce: string
      quota: number
      validUntilBlock: string | number
      value: string | number
      version?: number | undefined
      chainId: number
      to?: string | undefined
    },
    externalKey?: string | undefined
  ) => any)[]
}
export declare const newMessageFilter: {
  name: string
  call: string
  params: number
}
export declare const newBlockFilter: {
  name: string
  call: string
  params: number
}
export declare const getFilterChanges: {
  name: string
  call: string
  params: number
}
export declare const getFilterLogs: {
  name: string
  call: string
  params: number
}
export declare const deleteMessageFilter: {
  name: string
  call: string
  params: number
}
export declare const sign: {
  name: string
  call: string
  params: number
  inputFormatter: any[]
  transformPayload: (payload: any) => any
}
export declare const call: {
  name: string
  call: string
  params: number
  inputFormatter: any[]
}
export declare const getLogs: {
  name: string
  call: string
  params: number
}
