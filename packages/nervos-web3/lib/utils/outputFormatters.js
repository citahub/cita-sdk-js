"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils = require('web3-utils');
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
