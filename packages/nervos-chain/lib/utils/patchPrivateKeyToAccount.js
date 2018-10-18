"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (web3) => {
    web3.eth.accounts.privateKeyToAccount = new Proxy(web3.eth.accounts.privateKeyToAccount, {
        apply: (target, _thisArg, argumentsList) => {
            let privateKey = argumentsList[0];
            if (privateKey && privateKey.length === 64) {
                privateKey = '0x' + privateKey;
            }
            return target.call(_thisArg, privateKey);
        }
    });
};
