const { unsigner } = require('@cryptape/cita-signer')
const utils = require('web3-utils')

export namespace RPC {
  export interface getTransactionResult {
    blockHash: string
    blockNumber: string

    content: string
    hash: string
    index: string
  }
}
export const outputTransactionFormatter = (
  rpcTx: RPC.getTransactionResult
) => ({
  ...rpcTx,
  unsignedTransaction: unsigner(rpcTx.content)
})
export const outputAbiFormatter = (_abi: string) => {
  if (typeof _abi !== 'string') throw new Error('Malformed ABI')

  const abiStr = utils.hexToUtf8(_abi)
  try {
    const abi = JSON.parse(abiStr)
    return abi
  } catch (err) {
    throw new Error('Malformed ABI')
  }
}
