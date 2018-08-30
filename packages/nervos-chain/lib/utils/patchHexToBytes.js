"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (web3) => {
    web3.utils.hexToBytes = new Proxy(web3.utils.hexToBytes, {
        apply: (target, _thisArg, argumentsList) => {
            let hex = ('' + argumentsList[0] || '').replace(/^0x/, '');
            if (hex.length % 2) {
                hex = '0' + hex;
            }
            return target('0x' + hex);
        }
    });
};
