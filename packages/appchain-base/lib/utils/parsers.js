"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ABICoder = require('web3-eth-abi');
exports.LogParser = (log, abi) => {
    if (typeof log === 'string')
        return log;
    if (!abi)
        throw new Error('ABI Missed');
    const decodedLogs = ABICoder.decodeLog(abi, log.data || '', log.topics || []);
    return Object.assign({}, log, { decodedLogs });
};
