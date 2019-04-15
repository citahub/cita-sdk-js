// import Contract from 'web3-eth-contract'
import signer from '@cryptape/cita-signer'
import addPrivateKeyFrom from '../utils/addPrivateKey'
import * as _ from 'underscore'
import Subscription from '../subscriptions/subscription'
const Contract = require('web3-eth-contract')
const Method = require('web3-core-method')
const utils = require('web3-utils')
const { formatters } = require('web3-core-helpers')
const promiEvent = require('web3-core-promievent')

enum Action {
  NONE = '',
  CALL = 'call',
  SEND = 'send',
  SEND_TRANSACTION = 'sendTransaction'
}
const sign = (_tx: any) => {
  const tx = addPrivateKeyFrom(Contract.accounts.wallet)(_tx)
  return signer(tx)
}
Contract.prototype._executeMethod = function _executeMethod() {
  const ctx = this
  let args: any = this._parent._processExecuteArguments.call(
    this,
    Array.prototype.slice.call(arguments),
    defer
  )
  var defer: any = promiEvent(args.type !== 'send')
  const ethAccounts = ctx.constructor._ethAccounts || ctx._ethAccounts

  // simple return request for batch requests
  if (args.generateRequest) {
    const payload = {
      params: [formatters.inputCallFormatter.call(this._parent, args.options)],
      callback: args.callback,
      method: '',
      format: null
    }

    if (args.type === Action.CALL) {
      payload.params.push(
        formatters.inputDefaultBlockNumberFormatter.call(
          this._parent,
          args.defaultBlock
        )
      )
      payload.method = Action.CALL
      payload.format = this._parent._decodeMethodReturn.bind(
        null,
        this._method.outputs
      )
    } else {
      payload.method = Action.SEND_TRANSACTION
    }

    return payload
  } else {
    switch (args.type) {
      case Action.CALL:
        // TODO check errors: missing "from" should give error on deploy and send, call ?

        const call = new Method({
          name: 'call',
          call: Action.CALL,
          params: 2,
          inputFormatter: [
            formatters.inputCallFormatter,
            formatters.inputDefaultBlockNumberFormatter
          ],
          outputFormatter: function(result: any) {
            return ctx._parent._decodeMethodReturn(ctx._method.outputs, result)
          },
          requestManager: ctx._parent._requestManager,
          accounts: ethAccounts, // is eth.accounts (necessary for wallet signing)
          defaultAccount: ctx._parent.defaultAccount,
          defaultBlock: ctx._parent.defaultBlock
        }).createFunction()

        return call(args.options, args.defaultBlock, args.callback)

      case Action.SEND:
        // return error, if no "from" is specified
        if (!utils.isAddress(args.options.from)) {
          return utils._fireError(
            new Error(
              'No "from" address specified in neither the given options, nor the default options.'
            ),
            defer.eventEmitter,
            defer.reject,
            args.callback
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
              'Can not send value to non-payable contract method or constructor'
            ),
            defer.eventEmitter,
            defer.reject,
            args.callback
          )
        }

        // make sure receipt logs are decoded
        const extraFormatters = {
          receiptFormatter: (receipt: any) => {
            if (_.isArray(receipt.logs)) {
              // decode logs
              const events = _.map(receipt.logs, function(log: any) {
                return ctx._parent._decodeEventABI.call(
                  {
                    name: 'ALLEVENTS',
                    jsonInterface: ctx._parent.options.jsonInterface
                  },
                  log
                )
              })

              // make log names keys
              receipt.events = {}
              let count = 0
              events.forEach((ev: any) => {
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
          contractDeployFormatter: (receipt: any) => {
            const newContract = ctx._parent.clone()
            newContract.options.address = receipt.contractAddress
            return newContract
          }
        }

        const sendTransaction = new Method({
          name: 'sendTransaction',
          call: Action.SEND_TRANSACTION,
          params: 1,
          inputFormatter: [sign],
          requestManager: ctx._parent._requestManager,
          accounts: Contract.accounts, // is eth.accounts (necessary for wallet signing)
          defaultAccount: ctx._parent.defaultAccount,
          defaultBlock: ctx._parent.defaultBlock,
          extraFormatters: extraFormatters
        }).createFunction()

        return sendTransaction(args.options, args.callback)
    }
  }
}

// get past log subscription
Contract.prototype._on = function() {
  const ctx = this
  var subOptions = this._generateEventOptions.apply(this, arguments)

  // prevent the event "newListener" and "removeListener" from being overwritten
  this._checkListener('newListener', subOptions.event.name, subOptions.callback)
  this._checkListener(
    'removeListener',
    subOptions.event.name,
    subOptions.callback
  )

  // TODO check if listener already exists? and reuse subscription if options are the same.

  // create new subscription
  var subscription = new Subscription({
    subscription: {
      params: 1,
      inputFormatter: [formatters.inputLogFormatter],
      outputFormatter: this._decodeEventABI.bind(subOptions.event),
      // DUBLICATE, also in web3-eth
      subscriptionHandler: function(output: any) {
        if (output.removed) {
          ctx.emit('changed', output)
        } else {
          ctx.emit('data', output)
        }

        if (_.isFunction(ctx.callback)) {
          ctx.callback(null, output, this)
        }
      }
    },
    type: 'eth',
    requestManager: this._requestManager
  })
  subscription.subscribe(
    'logs',
    subOptions.params,
    subOptions.callback || function() {}
  )

  return subscription
}

// getPastLogs RPC
Contract.prototype.getPastEvents = function() {
  const subOptions = this._generateEventOptions.apply(this, arguments)

  let getPastLogs = new Method({
    name: 'getPastLogs',
    call: 'getLogs',
    params: 1,
    inputFormatter: [formatters.inputLogFormatter],
    outputFormatter: this._decodeEventABI.bind(subOptions.event)
  })
  getPastLogs.setRequestManager(this._requestManager)
  const call = getPastLogs.buildCall()

  getPastLogs = null

  return call(subOptions.params, subOptions.callback)
}

export default Contract
