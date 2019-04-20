"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cita_signer_1 = __importDefault(require("@cryptape/cita-signer"));
const _ = require('underscore');
const formatters = require('web3-core-helpers').formatters;
const utils = require('web3-utils');
const outputFormatter = __importStar(require("../utils/outputFormatters"));
exports.peerCount = {
    name: 'peerCount',
    call: 'peerCount',
    params: 0
};
exports.getMetaData = {
    name: 'getMetaData',
    call: 'getMetaData',
    params: 1,
    inputFormatter: [formatters.inputDefaultBlockNumberFormatter]
};
exports.getAbi = {
    name: 'getAbi',
    call: 'getAbi',
    params: 2,
    inputFormatter: [
        formatters.inputAddressFormatter,
        formatters.inputDefaultBlockNumberFormatter
    ],
    outputFormatter: outputFormatter.outputAbiFormatter
};
exports.getTransactionReceipt = {
    name: 'getTransactionReceipt',
    call: 'getTransactionReceipt',
    params: 1,
    outputFormatter: formatters.outputTransactionReceiptFormatter
};
exports.getCode = {
    name: 'getCode',
    call: 'getCode',
    params: 2,
    inputFormatter: [
        formatters.inputAddressFormatter,
        formatters.inputDefaultBlockNumberFormatter
    ]
};
exports.getAccounts = {
    name: 'getAccounts',
    call: 'accounts',
    params: 0,
    outputFormatter: utils.toChecksumAddress
};
exports.getBalance = {
    name: 'getBalance',
    call: 'getBalance',
    params: 2,
    inputFormatter: [
        formatters.inputAddressFormatter,
        formatters.inputDefaultBlockNumberFormatter
    ],
    outputFormatter: utils.hexToNumberString
};
const blockCall = function (args) {
    return _.isString(args[0]) && args[0].indexOf('0x') === 0
        ? 'getBlockByHash'
        : 'getBlockByNumber';
};
exports.getBlock = {
    name: 'getBlock',
    call: blockCall,
    params: 2,
    inputFormatter: [
        formatters.inputBlockNumberFormatter,
        function (val) {
            return !!val;
        }
    ],
    outputFormatter: formatters.outputBlockFormatter
};
exports.getBlockByHash = {
    name: 'getBlockByHash',
    call: 'getBlockByHash',
    params: 2,
    inputFormatter: [
        formatters.inputBlockNumberFormatter,
        function (val) {
            return !!val;
        }
    ],
    outputFormatter: formatters.outputBlockFormatter
};
exports.getBlockByNumber = {
    name: 'getBlockByNumber',
    call: 'getBlockByNumber',
    params: 2,
    inputFormatter: [
        formatters.inputBlockNumberFormatter,
        function (val) {
            return !!val;
        }
    ],
    outputFormatter: formatters.outputBlockFormatter
};
exports.getBlockNumber = {
    name: 'getBlockNumber',
    call: 'blockNumber',
    params: 0,
    outputFormatter: utils.hexToNumber
};
const getBlockTransactionCountCall = function (args) {
    return _.isString(args[0]) && args[0].indexOf('0x') === 0
        ? 'getBlockTransactionCountByHash'
        : 'getBlockTransactionCountByNumber';
};
exports.getBlockTransactionCount = {
    name: 'getBlockTransactionCount',
    call: getBlockTransactionCountCall,
    params: 1,
    inputFormatter: [formatters.inputBlockNumberFormatter],
    outputFormatter: utils.hexToNumber
};
exports.getTransaction = {
    name: 'getTransaction',
    call: 'getTransaction',
    params: 1,
    inputFormatter: [null],
    outputFormatter: outputFormatter.outputTransactionFormatter
};
exports.getTransactionCount = {
    name: 'getTransactionCount',
    call: 'getTransactionCount',
    params: 2,
    inputFormatter: [
        formatters.inputAddressFormatter,
        formatters.inputDefaultBlockNumberFormatter
    ],
    outputFormatter: utils.hexToNumber
};
exports.getTransactionProof = {
    name: 'getTransactionProof',
    call: 'getTransactionProof',
    params: 1
};
exports.sendSignedTransaction = {
    name: 'sendSignedTransaction',
    call: 'sendRawTransaction',
    params: 1,
    inputFormatter: [null]
};
exports.signTransaction = {
    name: 'signTransaction',
    call: 'signTransaction',
    params: 1,
    inputFormatter: [cita_signer_1.default]
};
const sendTransactionCall = (args) => {
    if (args && args.length && args[0] && args[0].privateKey) {
        return 'sendRawTransaction';
    }
    return 'sendTransaction';
};
exports.sendTransaction = {
    name: 'sendTransaction',
    call: sendTransactionCall,
    params: 1,
    inputFormatter: [cita_signer_1.default]
};
exports.newMessageFilter = {
    name: 'newMessageFilter',
    call: 'newFilter',
    params: 1
};
exports.newBlockFilter = {
    name: 'newBlockFilter',
    call: 'newBlockFilter',
    params: 0
};
exports.getFilterChanges = {
    name: 'getFilterChanges',
    call: 'getFilterChanges',
    params: 1
};
exports.getFilterLogs = {
    name: 'getFilterLogs',
    call: 'getFilterLogs',
    params: 1
};
exports.deleteMessageFilter = {
    name: 'deleteMessageFilter',
    call: 'uninstallFilter',
    params: 1
};
exports.sign = {
    name: 'sign',
    call: 'sign',
    params: 2,
    inputFormatter: [
        formatters.inputSignFormatter,
        formatters.inputAddressFormatter
    ],
    transformPayload: function (payload) {
        payload.params.reverse();
        return payload;
    }
};
exports.call = {
    name: 'call',
    call: 'call',
    params: 2,
    inputFormatter: [
        formatters.inputCallFormatter,
        formatters.inputDefaultBlockNumberFormatter
    ]
};
exports.getLogs = {
    name: 'getLogs',
    call: 'getLogs',
    params: 1
};
exports.peersInfo = {
    name: 'peersInfo',
    call: 'peersInfo',
    params: 0
};
exports.getVersion = {
    name: 'getVersion',
    call: 'getVersion',
    params: 0
};
