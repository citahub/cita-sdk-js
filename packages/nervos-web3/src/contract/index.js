import sign from '@nervos/signer'
/* eslint-disable */
var _ = require('underscore')
var core = require('web3-core')
var Method = require('web3-core-method')
var utils = require('web3-utils')
var Subscription = require('web3-core-subscriptions').subscription
var formatters = require('web3-core-helpers').formatters
var errors = require('web3-core-helpers').errors
var promiEvent = require('web3-core-promievent')
var abi = require('web3-eth-abi')
export default function _executeMethod() {
  var _this = this,
    args = this._parent._processExecuteArguments.call(
      this,
      Array.prototype.slice.call(arguments),
      defer,
    ),
    defer = promiEvent(args.type !== 'send'),
    ethAccounts = _this.constructor._ethAccounts || _this._ethAccounts

  // simple return request for batch requests
  if (args.generateRequest) {
    var payload = {
      params: [formatters.inputCallFormatter.call(this._parent, args.options)],
      callback: args.callback,
    }

    if (args.type === 'call') {
      payload.params.push(
        formatters.inputDefaultBlockNumberFormatter.call(
          this._parent,
          args.defaultBlock,
        ),
      )
      payload.method = 'call'
      payload.format = this._parent._decodeMethodReturn.bind(
        null,
        this._method.outputs,
      )
    } else {
      payload.method = 'sendTransaction'
    }

    return payload
  } else {
    switch (args.type) {
      case 'estimate':
        var estimateGas = new Method({
          name: 'estimateGas',
          call: 'eth_estimateGas',
          params: 1,
          inputFormatter: [formatters.inputCallFormatter],
          outputFormatter: utils.hexToNumber,
          requestManager: _this._parent._requestManager,
          accounts: ethAccounts, // is eth.accounts (necessary for wallet signing)
          defaultAccount: _this._parent.defaultAccount,
          defaultBlock: _this._parent.defaultBlock,
        }).createFunction()

        return estimateGas(args.options, args.callback)

      case 'call':
        // TODO check errors: missing "from" should give error on deploy and send, call ?

        var call = new Method({
          name: 'call',
          call: 'call',
          params: 2,
          inputFormatter: [
            formatters.inputCallFormatter,
            formatters.inputDefaultBlockNumberFormatter,
          ],
          // add output formatter for decoding
          outputFormatter: function (result) {
            return _this._parent._decodeMethodReturn(
              _this._method.outputs,
              result,
            )
          },
          requestManager: _this._parent._requestManager,
          accounts: ethAccounts, // is eth.accounts (necessary for wallet signing)
          defaultAccount: _this._parent.defaultAccount,
          defaultBlock: _this._parent.defaultBlock,
        }).createFunction()

        return call(args.options, args.defaultBlock, args.callback)

      case 'send':
        // return error, if no "from" is specified
        if (!utils.isAddress(args.options.from)) {
          return utils._fireError(
            new Error(
              'No "from" address specified in neither the given options, nor the default options.',
            ),
            defer.eventEmitter,
            defer.reject,
            args.callback,
          )
        }

        if (
          _.isBoolean(this._method.payable) &&
          !this._method.payable &&
          args.options.value &&
          args.options.value > 0
        ) {
          return utils._fireError(
            new Error(
              'Can not send value to non-payable contract method or constructor',
            ),
            defer.eventEmitter,
            defer.reject,
            args.callback,
          )
        }

        // make sure receipt logs are decoded
        var extraFormatters = {
          receiptFormatter: function (receipt) {
            if (_.isArray(receipt.logs)) {
              // decode logs
              var events = _.map(receipt.logs, function (log) {
                return _this._parent._decodeEventABI.call({
                    name: 'ALLEVENTS',
                    jsonInterface: _this._parent.options.jsonInterface,
                  },
                  log,
                )
              })

              // make log names keys
              receipt.events = {}
              var count = 0
              events.forEach(function (ev) {
                if (ev.event) {
                  // if > 1 of the same event, don't overwrite any existing events
                  if (receipt.events[ev.event]) {
                    if (Array.isArray(receipt.events[ev.event])) {
                      receipt.events[ev.event].push(ev)
                    } else {
                      receipt.events[ev.event] = [receipt.events[ev.event], ev]
                    }
                  } else {
                    receipt.events[ev.event] = ev
                  }
                } else {
                  receipt.events[count] = ev
                  count++
                }
              })

              delete receipt.logs
            }
            return receipt
          },
          contractDeployFormatter: function (receipt) {
            var newContract = _this._parent.clone()
            newContract.options.address = receipt.contractAddress
            return newContract
          },
        }

        var call = args.options.quota ? 'sendTransaction' : 'eth_sendTransaction'
        var signer = args.options.quota ? sign : formatters.inputDefaultBlockNumberFormatter


        var sendTransaction = new Method({
          name: 'sendTransaction',
          call,
          params: 1,
          inputFormatter: [signer],
          requestManager: _this._parent._requestManager,
          accounts: _this.constructor._ethAccounts || _this._ethAccounts, // is eth.accounts (necessary for wallet signing)
          defaultAccount: _this._parent.defaultAccount,
          defaultBlock: _this._parent.defaultBlock,
          extraFormatters: extraFormatters,
        }).createFunction()

        return sendTransaction(args.options, args.callback)
    }
  }
}
/* eslint-enable */
