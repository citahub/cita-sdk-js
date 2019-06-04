/*
    This file is a copy of web3-eth-subscription

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

var _ = require('underscore')
var errors = require('web3-core-helpers').errors
var EventEmitter = require('eventemitter3')

class Subscription extends EventEmitter {
  id: any
  callback: any
  arguments: any
  _reconnectIntervalId: any
  options: any
  subscriptionMethod: any
  constructor(options: any) {
    super(options)

    this.id = null
    this.callback = _.identity
    this.arguments = null
    this._reconnectIntervalId = null

    this.options = {
      subscription: options.subscription,
      type: options.type,
      requestManager: options.requestManager
    }
  }
  _extractCallback = (...args: any[]) => {
    if (_.isFunction(args[args.length - 1])) {
      return args.pop() // modify the args array!
    }
  }

  _validateArgs = (...args: any[]) => {
    var subscription = this.options.subscription

    if (!subscription) subscription = {}

    if (!subscription.params) subscription.params = 0

    if (args.length !== subscription.params) {
      throw errors.InvalidNumberOfParams(
        args.length,
        subscription.params + 1,
        args[0]
      )
    }
  }

  _formatInput = (args: any[]) => {
    var subscription = this.options.subscription

    if (!subscription) {
      return args
    }

    if (!subscription.inputFormatter) {
      return args
    }

    var formattedArgs = subscription.inputFormatter.map(function(
      formatter: Function,
      index: number
    ) {
      return formatter ? formatter(args[index]) : args[index]
    })

    return formattedArgs
  }

  _formatOutput = (result: any) => {
    var subscription = this.options.subscription

    return subscription && subscription.outputFormatter && result
      ? subscription.outputFormatter(result)
      : result
  }

  _toPayload = (args: any[]) => {
    var params = []
    this.callback = this._extractCallback(args) || _.identity

    if (!this.subscriptionMethod) {
      this.subscriptionMethod = args.shift()

      // replace subscription with given name
      if (this.options.subscription.subscriptionName) {
        this.subscriptionMethod = this.options.subscription.subscriptionName
      }
    }

    if (!this.arguments) {
      this.arguments = this._formatInput(args)
      this._validateArgs(this.arguments)
      args = [] // make empty after validation
    }

    // re-add subscriptionName
    params.push(this.subscriptionMethod)
    params = params.concat(this.arguments)

    if (args.length) {
      throw new Error(
        'Only a callback is allowed as parameter on an already instantiated subscription.'
      )
    }

    let method = params.shift()
    if (method === 'logs') {
      method = 'getLogs'
    }

    return {
      // method: this.options.type + '_subscribe',
      method,
      params: params
    }
  }

  unsubscribe = (callback?: Function) => {
    this.options.requestManager.removeSubscription(this.id, callback)
    this.id = null
    this.removeAllListeners()
    clearInterval(this._reconnectIntervalId)
  }

  subscribe = (...args: any[]) => {
    var _this = this
    var payload = this._toPayload(args)

    if (!payload) {
      return this
    }

    if (!this.options.requestManager.provider) {
      var err1 = new Error('No provider set.')
      this.callback(err1, null, this)
      this.emit('error', err1)
      return this
    }

    // throw error, if provider doesnt support subscriptions
    if (!this.options.requestManager.provider.on) {
      var err2 = new Error(
        `The current provider doesn't support subscriptions: ${
          this.options.requestManager.provider.constructor.name
        }`
      )
      this.callback(err2, null, this)
      this.emit('error', err2)
      return this
    }

    // if id is there unsubscribe first
    if (this.id) {
      this.unsubscribe()
    }

    // store the params in the options object
    this.options.params = payload.params[1]

    // get past logs, if fromBlock is available
    if (
      payload.params[0] === 'logs' &&
      _.isObject(payload.params[1]) &&
      payload.params[1].hasOwnProperty('fromBlock') &&
      isFinite(payload.params[1].fromBlock)
    ) {
      // send the subscription request
      this.options.requestManager.send(
        {
          method: 'getLogs',
          params: [payload.params[1]]
        },
        function(err: Error, logs: any) {
          if (!err) {
            logs.forEach(function(log: any) {
              var output = _this._formatOutput(log)
              _this.callback(null, output, _this)
              _this.emit('data', output)
            })

            // TODO subscribe here? after the past logs?
          } else {
            _this.callback(err, null, _this)
            _this.emit('error', err)
          }
        }
      )
    }

    // create subscription
    // TODO move to separate function? so that past logs can go first?

    if (typeof payload.params[1] === 'object')
      delete payload.params[1].fromBlock

    this.options.requestManager.send(payload, function(
      err: Error,
      result: any
    ) {
      if (!err && result) {
        _this.id = result

        // call callback on notifications
        _this.options.requestManager.addSubscription(
          _this.id,
          payload.params[0],
          _this.options.type,
          function(err: Error, result: any) {
            if (!err) {
              if (!_.isArray(result)) {
                result = [result]
              }

              result.forEach(function(resultItem: any) {
                var output = _this._formatOutput(resultItem)

                if (
                  _.isFunction(_this.options.subscription.subscriptionHandler)
                ) {
                  return _this.options.subscription.subscriptionHandler.call(
                    _this,
                    output
                  )
                } else {
                  _this.emit('data', output)
                }

                // call the callback, last so that unsubscribe there won't affect the emit above
                _this.callback(null, output, _this)
              })
            } else {
              // unsubscribe, but keep listeners
              _this.options.requestManager.removeSubscription(_this.id)

              // re-subscribe, if connection fails
              if (_this.options.requestManager.provider.once) {
                _this._reconnectIntervalId = setInterval(function() {
                  // TODO check if that makes sense!
                  if (_this.options.requestManager.provider.reconnect) {
                    _this.options.requestManager.provider.reconnect()
                  }
                }, 500)

                _this.options.requestManager.provider.once(
                  'connect',
                  function() {
                    clearInterval(_this._reconnectIntervalId)
                    _this.subscribe(_this.callback)
                  }
                )
              }
              _this.emit('error', err)

              // call the callback, last so that unsubscribe there won't affect the emit above
              _this.callback(err, null, _this)
            }
          }
        )
      } else {
        _this.callback(err, null, _this)
        _this.emit('error', err)
      }
    })

    return this
  }
}

module.exports = Subscription
export default Subscription
