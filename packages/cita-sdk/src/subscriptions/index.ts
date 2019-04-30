/*
    This file is a copy of of web3-eth-subscriptions

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

import Subscription from './subscription'

class Subscriptions {
  public name: string
  public type: string
  public subscriptions: any
  public requestManager: any

  constructor(options) {
    this.name = options.name
    this.type = options.type
    this.subscriptions = options.subscriptions || {}
    this.requestManager = null
  }
  public setRequestManager = (rm: any) => {
    this.requestManager = rm
  }
  public attachToObject = (obj: any) => {
    var func = this.buildCall()
    var name = this.name.split('.')
    if (name.length > 1) {
      obj[name[0]] = obj[name[0]] || {}
      obj[name[0]][name[1]] = func
    } else {
      obj[name[0]] = func
    }
  }

  buildCall = () => {
    var _this = this

    return function() {
      if (!_this.subscriptions[arguments[0]]) {
        console.warn(
          `Subscription ${JSON.stringify(
            arguments[0]
          )} doesn't exist. Subscribing anyway.`
        )
      }

      var subscription = new Subscription({
        subscription: _this.subscriptions[arguments[0]],
        requestManager: _this.requestManager,
        type: _this.type
      })

      return subscription.subscribe.apply(subscription, arguments)
    }
  }
}

module.exports = {
  subscriptions: Subscriptions,
  subscription: Subscription
}

export default {
  subscriptions: Subscriptions,
  subscription: Subscription
}
