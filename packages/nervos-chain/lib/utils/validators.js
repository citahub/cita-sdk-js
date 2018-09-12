"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require('web3-utils');
exports.isPrivateKey = (privateKey) => {
    if (!privateKey) {
        console.warn('No Private Key');
        return false;
    }
    if (typeof privateKey !== 'string') {
        console.warn('Invalid Type of Private Key');
        return false;
    }
    const pk = privateKey.replace(/^0x/, '');
    if (pk.length !== 64) {
        console.warn('Invalid Length of Private Key');
        return false;
    }
    if (!utils.isHex(pk)) {
        console.warn('Invalid Hex of Private Key');
        return false;
    }
    return true;
};
exports.default = {
    isPrivateKey: exports.isPrivateKey
};
