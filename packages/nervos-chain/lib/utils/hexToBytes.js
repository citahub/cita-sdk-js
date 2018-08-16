"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signer_1 = require("@nervos/signer");
exports.default = (web3) => {
    web3.utils.hexToBytes = signer_1.hex2bytes;
};
