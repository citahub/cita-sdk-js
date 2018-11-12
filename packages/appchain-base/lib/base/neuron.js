"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatters = require('web3-core-helpers').formatters;
const utils = require('web3-utils');
exports.getAccounts = {
    name: 'getAccounts',
    call: 'personal_listAccounts',
    params: 0,
    outputFormatter: utils.toChecksumAddress
};
exports.newAccount = {
    name: 'newAccount',
    call: 'personal_newAccount',
    params: 1,
    inputFormatter: [null],
    outputFormatter: utils.toChecksumAddress
};
exports.unlockAccount = {
    name: 'unlockAccount',
    call: 'personal_unlockAccount',
    params: 3,
    inputFormatter: [formatters.inputAddressFormatter, null, null]
};
exports.lockAccount = {
    name: 'lockAccount',
    call: 'personal_lockAccount',
    params: 1,
    inputFormatter: [formatters.inputAddressFormatter]
};
exports.sign = {
    name: 'neuron_sign',
    call: 'neuron_sign',
    params: 3,
    inputFormatter: [
        formatters.inputSignFormatter,
        formatters.inputAddressFormatter,
        null
    ],
    transformPayload: function (payload) {
        payload.params.reverse();
        return payload;
    }
};
exports.ecRecover = {
    name: 'ecRecover',
    call: 'personal_ecRecover',
    params: 2,
    inputFormatter: [formatters.inputSignFormatter, null]
};
