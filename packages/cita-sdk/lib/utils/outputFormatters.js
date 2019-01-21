"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { unsigner } = require('@cryptape/cita-signer');
const utils = require('web3-utils');
exports.outputTransactionFormatter = (rpcTx) => (Object.assign({}, rpcTx, { unsignedTransaction: unsigner(rpcTx.content) }));
exports.outputAbiFormatter = (_abi) => {
    if (typeof _abi !== 'string')
        throw new Error('Malformed ABI');
    const abiStr = utils.hexToUtf8(_abi);
    try {
        const abi = JSON.parse(abiStr);
        return abi;
    }
    catch (err) {
        throw new Error('Malformed ABI');
    }
};
