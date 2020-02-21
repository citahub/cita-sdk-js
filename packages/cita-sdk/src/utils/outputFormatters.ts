const { unsigner } = require('@citahub/cita-signer')
const Web3 = require('web3')
const web3 = new Web3()
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

  const abiStr = web3.eth.abi.decodeParameter('string', _abi)
  try {
    const abi = JSON.parse(abiStr)
    return abi
  } catch (err) {
    throw new Error('Malformed ABI')
  }
}
