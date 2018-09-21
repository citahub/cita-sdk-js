// load manifest

const manifestDOM = document.querySelector('link[ref=manifest]')
if (manifestDOM) {
  const href = manifestDOM.href
  fetch(href).then(res => res.json()).then(m => {
    if (m) {
      window.postMessage({
        action: 'manifest',
        data: m
      }, "*")
    }
  }).catch(window.console.error)
}

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
          cb(null, res.id === -1 ? res.result : res)
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

  sdk.appchain.sign = new Proxy(
    sdk.appchain.sign, {
      apply: (target, thisArg, argumentsList) => {
        window.postMessage({
          action: 'sign',
          encryptedMessage: argumentsList[0],
          fromAccount: argumentsList[1],
        }, "*")
        return listener("returnSignedMessage", argumentsList[2])
      }
    }
  )
  sdk._requestManager.provider.__proto__.send = new Proxy(
    sdk._requestManager.provider.__proto__.send, {
      apply: (target, thisArg, argumentsList) => {
        const payload = argumentsList[0]
        const callback = argumentsList[1]
        if (payload && (
            payload.method === 'send' ||
            payload.method === 'sendTransaction')) {
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
  sdk.appchain.getDefaultAccount().then(account => {
    if (account) {
      sdk.appchain.defaultAccount = account
    }
  })
}

const neuronWebReadyEvent = new Event("neuronWebReady")

// Fuer die schwach app
if (window.localStorage.getItem('DISABLE_NEURON_WEB_AUTO_IMPORT')) {
  window.dispatchEvent(neuronWebReadyEvent)

} else {
  window.addEventListener("neuronWebReady", () => {
    window.console.log("NeuronWebReady")
    if (nervos) {
      window.addMessenger(nervos)
    }
  })
  setTimeout(() => {
    window.dispatchEvent(neuronWebReadyEvent)
  }, 1000)
}
