let i = 1
const listener = (actionType, cb) => {
  return new Promise((resolve, reject) => {
    window.addEventListener('message', (message) => {
      if (message.data.action === actionType) {
        if (cb) {
          cb(null, {
            jsonrpc: '2.0',
            id: i,
            result: message.data.data
          })
          // cb(null, message.data.data)
        }
        resolve(message.data.data)
      }
    })
  })
}
window.addMessenger = (sdk) => {
  sdk.appchain.getAccounts = (cb) => {
    window.postMessage({
      action: 'getAccounts',
    }, '*')
    return listener('returnAccounts', cb)
  }
  sdk.appchain.getDefaultAccount = (cb) => {
    window.postMessage({
      action: 'getDefaultAccount'
    }, '*')
    return listener('returnDefaultAccount', cb)
  }
  sdk._requestManager.provider.__proto__.send = new Proxy(
    sdk._requestManager.provider.__proto__.send, {
      apply: (target, thisArg, argumentsList) => {
        const payload = argumentsList[0]
        const callback = argumentsList[1]
        i++
        if (payload && (payload.method === 'send' || payload.method === 'sendTransaction')) {
          window.postMessage({
            action: 'sendTransaction',
            transaction: payload.params[0],
          }, '*')
          return listener("returnTransactionReceipt", callback)
        }
        target = target.bind(thisArg)
        target(...argumentsList)
        return target(...argumentsList)
      }
    }
  )
}
if (window.nervos) {
  window.addMessenger(window.nervos)
}
