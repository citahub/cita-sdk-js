import Web3 from 'web3'
import signer, { unsigner } from '@nervos/signer'
import * as rpc from './rpc'
import * as personal from './neuron'
import listener from './listener'
import addPrivateKeyFrom from '../utils/addPrivateKey'

export interface EnhancedWeb3 extends Web3 {
  appchain?: any
  listeners?: any
}

export default (web3: EnhancedWeb3) => {
  web3.extend({
    property: 'appchain',
    methods: [
      rpc.peerCount,
      rpc.getMetaData,
      rpc.getAbi,
      rpc.getCode,
      rpc.getBalance,
      rpc.getTransactionReceipt,
      rpc.getAccounts,
      rpc.getBlock,
      rpc.getBlockByHash,
      rpc.getBlockByNumber,
      rpc.getBlockNumber,
      rpc.getBlockTransactionCount,
      rpc.getTransaction,
      rpc.getTransactionCount,
      rpc.getTransactionProof,
      rpc.sendSignedTransaction,
      rpc.signTransaction,
      rpc.sendTransaction,
      rpc.sign,
      rpc.call,
      rpc.newMessageFilter,
      rpc.newBlockFilter,
      rpc.getFilterLogs,
      rpc.getFilterChanges,
      rpc.deleteMessageFilter,
      rpc.getLogs,
      personal.getAccounts,
      personal.newAccount,
      // personal.unlockAccount,
      // personal.lockAccount,
      // personal.sendTransaction,
      // personal.signTransaction,
      personal.sign,
      personal.ecRecover
    ]
  })
  // add contract
  web3.appchain.Contract = web3.eth.Contract
  web3 = listener(web3) as any
  web3.appchain.signer = signer
  web3.appchain.unsigner = unsigner

  web3.appchain.deploy = async (
    contract: string | { code: string; initTypes: string[]; args: any[] },
    transaction: any
  ) => {
    const currentHeight = await web3.appchain
      .getBlockNumber()
      .catch((err: any) => {
        console.error(err)
      })
    let bytecode = ''
    let paramaters = []
    let types: string[] = []
    let encodedArgs = ''
    if (typeof contract === 'string') {
      bytecode = contract
    } else if (contract.code) {
      bytecode = contract.code
      paramaters = contract.args || []
      types = contract.initTypes || []
    }
    if (paramaters.length) {
      encodedArgs = web3.eth.abi.encodeParameters(types, paramaters)
    }
    console.log(encodedArgs)

    const _tx = {
      version: 0,
      value: 0,
      nonce: Math.round(Math.random() * 10),
      ...transaction,
      data: bytecode.replace(/^0x/, '') + encodedArgs,
      validUntilBlock: +currentHeight + 88
    }

    const tx = addPrivateKeyFrom(web3.eth.accounts.wallet)(_tx)

    const result = await web3.appchain.sendTransaction(tx).catch((err: any) => {
      throw new Error(err)
    })

    if (!result.hash) {
      return new Error('No Transaction Hash Received')
    }
    return web3.listeners.listenToTransactionReceipt(result.hash)
  }
  web3.appchain._abiAddress = 'ffffffffffffffffffffffffffffffffff010001'
  Object.defineProperty(web3.appchain, 'abiAddress', {
    get: () => {
      return web3.appchain._abiAddress
    },
    set: (newAddr: string) => {
      if (web3.utils.isAddress(newAddr)) {
        web3.appchain._abiAddress = newAddr.replace(/^0x/, '')
      } else {
        throw new Error('Not valid address')
      }
    }
  })
  web3.appchain.storeAbi = async (
    contractAddress: string,
    abi: string,
    options: any
  ) => {
    if (!contractAddress) {
      throw new Error('Store ABI needs contract address')
    }
    if (!Array.isArray(abi)) {
      throw new Error('ABI should be Array type')
    }
    const _tx = {
      version: 0,
      value: 0,
      nonce: Math.round(Math.random() * 10),
      ...options,
      to: web3.appchain.abiAddress
    }
    const transaction = addPrivateKeyFrom(web3.eth.accounts.wallet)(_tx)
    try {
      const abiBytes = (web3.utils as any)
        .utf8ToHex(JSON.stringify(abi))
        .slice(2)
      transaction.data = contractAddress.replace(/^0x/i, '') + abiBytes
    } catch (err) {
      throw new Error(err)
    }
    const txResult = await web3.appchain.sendTransaction(transaction)
    const txReceipt = await web3.listeners.listenToTransactionReceipt(
      txResult.hash
    )
    return txReceipt
  }
  const neuron = {
    sign: web3.appchain.neuron_sign
  }
  web3.appchain.personal = neuron

  return web3
}
