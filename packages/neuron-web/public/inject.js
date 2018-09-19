const listener = (actionType, cb, payload) => {
  return new Promise((resolve, reject) => {
    window.addEventListener('message', (message) => {
      if (message.data.action === actionType) {
        const res = {
          jsonrpc: payload ? payload.jsonrpc : '2.0',
          id: payload ? payload.id : -1,
          result: message.data.data
        }
        if (cb) {
          cb(null, res)
        }
        resolve(res.id === -1 ? res.result : res)
      }
    })
  })
}
window.addMessenger = (sdk) => {
  sdk.appchain.getAccounts = (cb) => {
    window.postMessage({
      action: 'getAccounts',
    }, '*')
    return listener('returnAccounts', cb, {
      jsonrpc: '2.0',
      id: -1
    })
  }
  sdk.appchain.getDefaultAccount = (cb) => {
    window.postMessage({
      action: 'getDefaultAccount'
    }, '*')
    return listener('returnDefaultAccount', cb, {
      jsonrpc: '2.0',
      id: -1
    })
  }
  sdk._requestManager.provider.__proto__.send = new Proxy(
    sdk._requestManager.provider.__proto__.send, {
      apply: (target, thisArg, argumentsList) => {
        const payload = argumentsList[0]
        const callback = argumentsList[1]
        if (payload && (payload.method === 'send' || payload.method === 'sendTransaction')) {
          window.postMessage({
            action: 'sendTransaction',
            transaction: payload.params[0],
          }, '*')
          return listener("returnTransactionReceipt", callback, payload)
        }
        target = target.bind(thisArg)
        return target(...argumentsList)
      }
    }
  )
}

// Fuer die schwach app

window.addEventListener("neuronWebReady", () => {
  window.console.log("NeuronWebReady")
  window.addMessenger(nervos)
})
const neuronWebReadyEvent = new Event("neuronWebReady")
window.dispatchEvent(neuronWebReadyEvent)
