"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('underscore');
var errors = require('web3-core-helpers').errors;
var EventEmitter = require('eventemitter3');
class Subscription extends EventEmitter {
    constructor(options) {
        super(options);
        this._extractCallback = (...args) => {
            if (_.isFunction(args[args.length - 1])) {
                return args.pop();
            }
        };
        this._validateArgs = (...args) => {
            var subscription = this.options.subscription;
            if (!subscription)
                subscription = {};
            if (!subscription.params)
                subscription.params = 0;
            if (args.length !== subscription.params) {
                throw errors.InvalidNumberOfParams(args.length, subscription.params + 1, args[0]);
            }
        };
        this._formatInput = (args) => {
            var subscription = this.options.subscription;
            if (!subscription) {
                return args;
            }
            if (!subscription.inputFormatter) {
                return args;
            }
            var formattedArgs = subscription.inputFormatter.map(function (formatter, index) {
                return formatter ? formatter(args[index]) : args[index];
            });
            return formattedArgs;
        };
        this._formatOutput = (result) => {
            var subscription = this.options.subscription;
            return subscription && subscription.outputFormatter && result
                ? subscription.outputFormatter(result)
                : result;
        };
        this._toPayload = (args) => {
            var params = [];
            this.callback = this._extractCallback(args) || _.identity;
            if (!this.subscriptionMethod) {
                this.subscriptionMethod = args.shift();
                if (this.options.subscription.subscriptionName) {
                    this.subscriptionMethod = this.options.subscription.subscriptionName;
                }
            }
            if (!this.arguments) {
                this.arguments = this._formatInput(args);
                this._validateArgs(this.arguments);
                args = [];
            }
            params.push(this.subscriptionMethod);
            params = params.concat(this.arguments);
            if (args.length) {
                throw new Error('Only a callback is allowed as parameter on an already instantiated subscription.');
            }
            let method = params.shift();
            if (method === 'logs') {
                method = 'getLogs';
            }
            return {
                method,
                params: params
            };
        };
        this.unsubscribe = (callback) => {
            this.options.requestManager.removeSubscription(this.id, callback);
            this.id = null;
            this.removeAllListeners();
            clearInterval(this._reconnectIntervalId);
        };
        this.subscribe = (...args) => {
            var _this = this;
            var payload = this._toPayload(args);
            if (!payload) {
                return this;
            }
            if (!this.options.requestManager.provider) {
                var err1 = new Error('No provider set.');
                this.callback(err1, null, this);
                this.emit('error', err1);
                return this;
            }
            if (!this.options.requestManager.provider.on) {
                var err2 = new Error(`The current provider doesn't support subscriptions: ${this.options.requestManager.provider.constructor.name}`);
                this.callback(err2, null, this);
                this.emit('error', err2);
                return this;
            }
            if (this.id) {
                this.unsubscribe();
            }
            this.options.params = payload.params[1];
            if (payload.params[0] === 'logs' &&
                _.isObject(payload.params[1]) &&
                payload.params[1].hasOwnProperty('fromBlock') &&
                isFinite(payload.params[1].fromBlock)) {
                this.options.requestManager.send({
                    method: 'getLogs',
                    params: [payload.params[1]]
                }, function (err, logs) {
                    if (!err) {
                        logs.forEach(function (log) {
                            var output = _this._formatOutput(log);
                            _this.callback(null, output, _this);
                            _this.emit('data', output);
                        });
                    }
                    else {
                        _this.callback(err, null, _this);
                        _this.emit('error', err);
                    }
                });
            }
            if (typeof payload.params[1] === 'object')
                delete payload.params[1].fromBlock;
            this.options.requestManager.send(payload, function (err, result) {
                if (!err && result) {
                    _this.id = result;
                    _this.options.requestManager.addSubscription(_this.id, payload.params[0], _this.options.type, function (err, result) {
                        if (!err) {
                            if (!_.isArray(result)) {
                                result = [result];
                            }
                            result.forEach(function (resultItem) {
                                var output = _this._formatOutput(resultItem);
                                if (_.isFunction(_this.options.subscription.subscriptionHandler)) {
                                    return _this.options.subscription.subscriptionHandler.call(_this, output);
                                }
                                else {
                                    _this.emit('data', output);
                                }
                                _this.callback(null, output, _this);
                            });
                        }
                        else {
                            _this.options.requestManager.removeSubscription(_this.id);
                            if (_this.options.requestManager.provider.once) {
                                _this._reconnectIntervalId = setInterval(function () {
                                    if (_this.options.requestManager.provider.reconnect) {
                                        _this.options.requestManager.provider.reconnect();
                                    }
                                }, 500);
                                _this.options.requestManager.provider.once('connect', function () {
                                    clearInterval(_this._reconnectIntervalId);
                                    _this.subscribe(_this.callback);
                                });
                            }
                            _this.emit('error', err);
                            _this.callback(err, null, _this);
                        }
                    });
                }
                else {
                    _this.callback(err, null, _this);
                    _this.emit('error', err);
                }
            });
            return this;
        };
        this.id = null;
        this.callback = _.identity;
        this.arguments = null;
        this._reconnectIntervalId = null;
        this.options = {
            subscription: options.subscription,
            type: options.type,
            requestManager: options.requestManager
        };
    }
}
module.exports = Subscription;
exports.default = Subscription;
