"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cita_signer_1 = __importDefault(require("@cryptape/cita-signer"));
const addPrivateKey_1 = __importDefault(require("../utils/addPrivateKey"));
const _ = __importStar(require("underscore"));
const subscription_1 = __importDefault(require("../subscriptions/subscription"));
const Contract = require('web3-eth-contract');
const Method = require('web3-core-method');
const utils = require('web3-utils');
const { formatters } = require('web3-core-helpers');
const promiEvent = require('web3-core-promievent');
var Action;
(function (Action) {
    Action["NONE"] = "";
    Action["CALL"] = "call";
    Action["SEND"] = "send";
    Action["SEND_TRANSACTION"] = "sendTransaction";
})(Action || (Action = {}));
const sign = (_tx) => {
    const tx = addPrivateKey_1.default(Contract.accounts.wallet)(_tx);
    return cita_signer_1.default(tx);
};
Contract.prototype._executeMethod = function _executeMethod() {
    const ctx = this;
    let args = this._parent._processExecuteArguments.call(this, Array.prototype.slice.call(arguments), defer);
    var defer = promiEvent(args.type !== 'send');
    const ethAccounts = ctx.constructor._ethAccounts || ctx._ethAccounts;
    if (args.generateRequest) {
        const payload = {
            params: [formatters.inputCallFormatter.call(this._parent, args.options)],
            callback: args.callback,
            method: '',
            format: null
        };
        if (args.type === Action.CALL) {
            payload.params.push(formatters.inputDefaultBlockNumberFormatter.call(this._parent, args.defaultBlock));
            payload.method = Action.CALL;
            payload.format = this._parent._decodeMethodReturn.bind(null, this._method.outputs);
        }
        else {
            payload.method = Action.SEND_TRANSACTION;
        }
        return payload;
    }
    else {
        switch (args.type) {
            case Action.CALL:
                const call = new Method({
                    name: 'call',
                    call: Action.CALL,
                    params: 2,
                    inputFormatter: [
                        formatters.inputCallFormatter,
                        formatters.inputDefaultBlockNumberFormatter
                    ],
                    outputFormatter: function (result) {
                        return ctx._parent._decodeMethodReturn(ctx._method.outputs, result);
                    },
                    requestManager: ctx._parent._requestManager,
                    accounts: ethAccounts,
                    defaultAccount: ctx._parent.defaultAccount,
                    defaultBlock: ctx._parent.defaultBlock
                }).createFunction();
                return call(args.options, args.defaultBlock, args.callback);
            case Action.SEND:
                if (!utils.isAddress(args.options.from)) {
                    return utils._fireError(new Error('No "from" address specified in neither the given options, nor the default options.'), defer.eventEmitter, defer.reject, args.callback);
                }
                if (_.isBoolean(this._method.payable) &&
                    !this._method.payable &&
                    args.options.value &&
                    args.options.value > 0) {
                    return utils._fireError(new Error('Can not send value to non-payable contract method or constructor'), defer.eventEmitter, defer.reject, args.callback);
                }
                const extraFormatters = {
                    receiptFormatter: (receipt) => {
                        if (_.isArray(receipt.logs)) {
                            const events = _.map(receipt.logs, function (log) {
                                return ctx._parent._decodeEventABI.call({
                                    name: 'ALLEVENTS',
                                    jsonInterface: ctx._parent.options.jsonInterface
                                }, log);
                            });
                            receipt.events = {};
                            let count = 0;
                            events.forEach((ev) => {
                                if (ev.event) {
                                    if (receipt.events[ev.event]) {
                                        if (Array.isArray(receipt.events[ev.event])) {
                                            receipt.events[ev.event].push(ev);
                                        }
                                        else {
                                            receipt.events[ev.event] = [receipt.events[ev.event], ev];
                                        }
                                    }
                                    else {
                                        receipt.events[ev.event] = ev;
                                    }
                                }
                                else {
                                    receipt.events[count] = ev;
                                    count++;
                                }
                            });
                            delete receipt.logs;
                        }
                        return receipt;
                    },
                    contractDeployFormatter: (receipt) => {
                        const newContract = ctx._parent.clone();
                        newContract.options.address = receipt.contractAddress;
                        return newContract;
                    }
                };
                const sendTransaction = new Method({
                    name: 'sendTransaction',
                    call: Action.SEND_TRANSACTION,
                    params: 1,
                    inputFormatter: [sign],
                    requestManager: ctx._parent._requestManager,
                    accounts: Contract.accounts,
                    defaultAccount: ctx._parent.defaultAccount,
                    defaultBlock: ctx._parent.defaultBlock,
                    extraFormatters: extraFormatters
                }).createFunction();
                return sendTransaction(args.options, args.callback);
        }
    }
};
Contract.prototype._on = function () {
    const ctx = this;
    var subOptions = this._generateEventOptions.apply(this, arguments);
    this._checkListener('newListener', subOptions.event.name, subOptions.callback);
    this._checkListener('removeListener', subOptions.event.name, subOptions.callback);
    var subscription = new subscription_1.default({
        subscription: {
            params: 1,
            inputFormatter: [formatters.inputLogFormatter],
            outputFormatter: this._decodeEventABI.bind(subOptions.event),
            subscriptionHandler: function (output) {
                if (output.removed) {
                    ctx.emit('changed', output);
                }
                else {
                    ctx.emit('data', output);
                }
                if (_.isFunction(ctx.callback)) {
                    ctx.callback(null, output, this);
                }
            }
        },
        type: 'eth',
        requestManager: this._requestManager
    });
    subscription.subscribe('logs', subOptions.params, subOptions.callback || function () { });
    return subscription;
};
Contract.prototype.getPastEvents = function () {
    const subOptions = this._generateEventOptions.apply(this, arguments);
    let getPastLogs = new Method({
        name: 'getPastLogs',
        call: 'getLogs',
        params: 1,
        inputFormatter: [formatters.inputLogFormatter],
        outputFormatter: this._decodeEventABI.bind(subOptions.event)
    });
    getPastLogs.setRequestManager(this._requestManager);
    const call = getPastLogs.buildCall();
    getPastLogs = null;
    return call(subOptions.params, subOptions.callback);
};
exports.default = Contract;
