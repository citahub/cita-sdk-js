"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions = [
    'getTransactionReceipt',
    'getTransaction',
    'getTransactionProof',
    'getFilterChanges'
];
const listener = (web3) => {
    let listeners = {};
    actions.forEach(action => {
        listeners[`listenTo${action.slice(3)}`] = (params, times = 10) => {
            return new Promise((resolve, reject) => {
                let remains = times;
                let listener = null;
                const stopWatching = () => {
                    clearInterval(listener);
                };
                listener = setInterval(() => {
                    if (!remains) {
                        stopWatching();
                        reject('No Result Receved');
                    }
                    web3.appchain[action](params).then((res) => {
                        remains--;
                        if (res) {
                            clearInterval(listener);
                            resolve(res);
                        }
                    });
                }, 1000);
            });
        };
    });
    web3.listeners = listeners;
    return web3;
};
exports.default = listener;
