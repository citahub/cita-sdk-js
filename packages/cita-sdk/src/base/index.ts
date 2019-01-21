import Web3 = require('web3')
import signer, { unsigner } from '@cryptape/cita-signer'
import * as rpc from './rpc'
import * as personal from './neuron'
import listener from './listener'
import addPrivateKeyFrom from '../utils/addPrivateKey'
import Contract from '../contract'
import proxy from './proxy'
import validators from '../utils/validators'
import { ReservedAddr } from '../systems/config'

export interface EnhancedWeb3 extends Web3 {
  base?: any
  listeners?: any
}

export default (web3: EnhancedWeb3) => {
  web3.base = web3.base || {}
  web3.extend({
    property: 'base',
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
  // add account
  web3.base.accounts = web3.eth.accounts
  // add contract
  Contract.setProvider(web3.currentProvider)
  // Contract.prototype.accounts = web3.base.accounts
  Contract.accounts = web3.base.accounts
  web3.base.Contract = Contract
  web3 = listener(web3) as any
  web3.base.signer = signer
  web3.base.unsigner = unsigner

  web3.base.deploy = async (
    contract: string | { code: string; initTypes: string[]; args: any[] },
    transaction: any
  ) => {
    const currentHeight = await web3.base.getBlockNumber().catch((err: any) => {
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

    const _tx = {
      version: 0,
      value: 0,
      nonce: Math.round(Math.random() * 10),
      ...transaction,
      data: bytecode.replace(/^0x/, '') + encodedArgs,
      validUntilBlock: +currentHeight + 88
    }

    const tx = addPrivateKeyFrom(web3.eth.accounts.wallet)(_tx)

    const result = await web3.base.sendTransaction(tx).catch((err: any) => {
      throw new Error(err)
    })

    if (!result.hash) {
      return new Error('No Transaction Hash Received')
    }
    return web3.listeners.listenToTransactionReceipt(result.hash)
  }
  web3.base._abiAddress = ReservedAddr.abiAddress.replace(/^0x/, '')
  Object.defineProperty(web3.base, 'abiAddress', {
    get: () => {
      return web3.base._abiAddress
    },
    set: (newAddr: string) => {
      if (web3.utils.isAddress(newAddr)) {
        web3.base._abiAddress = newAddr.replace(/^0x/, '')
      } else {
        throw new Error('Not valid address')
      }
    }
  })
  web3.base.storeAbi = async (
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
      to: web3.base.abiAddress
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
    const txResult = await web3.base.sendTransaction(transaction)
    const txReceipt = await web3.listeners.listenToTransactionReceipt(
      txResult.hash
    )
    return txReceipt
  }
  const neuron = {
    sign: web3.base.neuron_sign
  }
  web3.base.personal = neuron
  // add validators
  Object.assign(web3.utils, validators)

  return proxy(web3)
}
