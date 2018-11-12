"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (wallet) => (transaction) => {
    if (!wallet.length ||
        (transaction.privateKey &&
            (transaction.privateKey.length === 66 ||
                transaction.privateKey.length === 64)))
        return transaction;
    if (!transaction.privateKey) {
        transaction.privateKey = wallet[0].privateKey;
        transaction.from = wallet[0].from;
    }
    return transaction;
};
