import signer from '@cryptape/cita-signer'
const _ = require('underscore')
const formatters = require('web3-core-helpers').formatters
const utils = require('web3-utils')
import * as outputFormatter from '../utils/outputFormatters'

export const peerCount = {
  name: 'peerCount',
  call: 'peerCount',
  params: 0
}

export const getMetaData = {
  name: 'getMetaData',
  call: 'getMetaData',
  params: 1,
  inputFormatter: [formatters.inputDefaultBlockNumberFormatter]
}

export const getAbi = {
  name: 'getAbi',
  call: 'getAbi',
  params: 2,
  inputFormatter: [
    formatters.inputAddressFormatter,
    formatters.inputDefaultBlockNumberFormatter
  ],
  outputFormatter: outputFormatter.outputAbiFormatter
}

export const getTransactionReceipt = {
  name: 'getTransactionReceipt',
  call: 'getTransactionReceipt',
  params: 1,
  outputFormatter: formatters.outputTransactionReceiptFormatter
}

export const getCode = {
  name: 'getCode',
  call: 'getCode',
  params: 2,
  inputFormatter: [
    formatters.inputAddressFormatter,
    formatters.inputDefaultBlockNumberFormatter
  ]
}

export const getAccounts = {
  name: 'getAccounts',
  call: 'accounts',
  params: 0,
  outputFormatter: utils.toChecksumAddress
}

export const getBalance = {
  name: 'getBalance',
  call: 'getBalance',
  params: 2,
  inputFormatter: [
    formatters.inputAddressFormatter,
    formatters.inputDefaultBlockNumberFormatter
  ],
  outputFormatter: utils.hexToNumberString
}

const blockCall = function(args: any) {
  return _.isString(args[0]) && args[0].indexOf('0x') === 0
    ? 'getBlockByHash'
    : 'getBlockByNumber'
}

export const getBlock = {
  name: 'getBlock',
  call: blockCall,
  params: 2,
  inputFormatter: [
    formatters.inputBlockNumberFormatter,
    function(val: any) {
      return !!val
    }
  ],
  outputFormatter: formatters.outputBlockFormatter
}
export const getBlockByHash = {
  name: 'getBlockByHash',
  call: 'getBlockByHash',
  params: 2,
  inputFormatter: [
    formatters.inputBlockNumberFormatter,
    function(val: any) {
      return !!val
    }
  ],
  outputFormatter: formatters.outputBlockFormatter
}
export const getBlockByNumber = {
  name: 'getBlockByNumber',
  call: 'getBlockByNumber',
  params: 2,
  inputFormatter: [
    formatters.inputBlockNumberFormatter,
    function(val: any) {
      return !!val
    }
  ],
  outputFormatter: formatters.outputBlockFormatter
}

export const getBlockNumber = {
  name: 'getBlockNumber',
  call: 'blockNumber',
  params: 0,
  outputFormatter: utils.hexToNumber
}
const getBlockTransactionCountCall = function(args: any) {
  return _.isString(args[0]) && args[0].indexOf('0x') === 0
    ? 'getBlockTransactionCountByHash'
    : 'getBlockTransactionCountByNumber'
}

export const getBlockTransactionCount = {
  name: 'getBlockTransactionCount',
  call: getBlockTransactionCountCall,
  params: 1,
  inputFormatter: [formatters.inputBlockNumberFormatter],
  outputFormatter: utils.hexToNumber
}

export const getTransaction = {
  name: 'getTransaction',
  call: 'getTransaction',
  params: 1,
  inputFormatter: [null],
  outputFormatter: outputFormatter.outputTransactionFormatter
}

export const getTransactionCount = {
  name: 'getTransactionCount',
  call: 'getTransactionCount',
  params: 2,
  inputFormatter: [
    formatters.inputAddressFormatter,
    formatters.inputDefaultBlockNumberFormatter
  ],
  outputFormatter: utils.hexToNumber
}

export const getTransactionProof = {
  name: 'getTransactionProof',
  call: 'getTransactionProof',
  params: 1
}

export const sendSignedTransaction = {
  name: 'sendSignedTransaction',
  call: 'sendRawTransaction',
  params: 1,
  inputFormatter: [null]
}

export const signTransaction = {
  name: 'signTransaction',
  call: 'signTransaction',
  params: 1,
  inputFormatter: [signer]
}

const sendTransactionCall = (args: any) => {
  if (args && args.length && args[0] && args[0].privateKey) {
    return 'sendRawTransaction'
  }
  return 'sendTransaction'
}
export const sendTransaction = {
  name: 'sendTransaction',
  call: sendTransactionCall,
  params: 1,
  inputFormatter: [signer]
}

export const newMessageFilter = {
  name: 'newMessageFilter',
  call: 'newFilter',
  params: 1
}
export const newBlockFilter = {
  name: 'newBlockFilter',
  call: 'newBlockFilter',
  params: 0
}
export const getFilterChanges = {
  name: 'getFilterChanges',
  call: 'getFilterChanges',
  params: 1
}

export const getFilterLogs = {
  name: 'getFilterLogs',
  call: 'getFilterLogs',
  params: 1
}

export const deleteMessageFilter = {
  name: 'deleteMessageFilter',
  call: 'uninstallFilter',
  params: 1
}

export const sign = {
  name: 'sign',
  call: 'sign',
  params: 2,
  inputFormatter: [
    formatters.inputSignFormatter,
    formatters.inputAddressFormatter
    // signer
  ],
  transformPayload: function(payload: any) {
    payload.params.reverse()
    return payload
  }
}

export const call = {
  name: 'call',
  call: 'call',
  params: 2,
  inputFormatter: [
    formatters.inputCallFormatter,
    formatters.inputDefaultBlockNumberFormatter
  ]
}

export const getLogs = {
  name: 'getLogs',
  call: 'getLogs',
  params: 1
}

// new coming in v0.23.0

export const peersInfo = {
  name: 'peersInfo',
  call: 'peersInfo',
  params: 0
}

export const getVersion = {
  name: 'getVersion',
  call: 'getVersion',
  params: 0
}
