"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions = [
    'getTransactionReceipt',
    'getTransaction',
    'getTransactionProof',
    'getFilterChanges'
];
const listener = (core) => {
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
                        reject('No Result Received');
                    }
                    core.base[action](params).then((res) => {
                        remains--;
                        if ((action === 'getFilterChanges' && res.length) || res) {
                            clearInterval(listener);
                            resolve(res);
                        }
                    });
                }, 1000);
            });
        };
    });
    core.listeners = listeners;
    return core;
};
exports.default = listener;
