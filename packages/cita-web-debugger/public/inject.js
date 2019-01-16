// load manifest

const manifestDOM = document.querySelector('link[ref=manifest]')
if (manifestDOM) {
  const href = manifestDOM.href
  fetch(href).then(res => res.json()).then(manifest => {
    window.manifest = manifest
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
  sdk.base.getAccounts = (cb) => {
    window.postMessage({
      action: 'getAccounts',
    }, '*')
    return listener('returnAccounts', cb, {
      jsonrpc: '2.0',
      id: -1
    })
  }
  sdk.base.getDefaultAccount = (cb) => {
    window.postMessage({
      action: 'getDefaultAccount'
    }, '*')
    return listener('returnDefaultAccount', cb, {
      jsonrpc: '2.0',
      id: -1
    })
  }

  sdk.base.sign = new Proxy(
    sdk.base.sign, {
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
          if (!window.manifest) {
            window.console.warn('Manifest not loaded')
          }
          window.postMessage({
            action: 'sendTransaction',
            transaction: payload.params[0],
            manifest: window.manifest
          }, '*')
          return listener("returnTransactionReceipt", callback, payload)
        }
        target = target.bind(thisArg)
        return target(...argumentsList)
      }
    }
  )
  sdk.base.getDefaultAccount().then(account => {
    if (account) {
      sdk.base.defaultAccount = account
    }
  })
  window.addEventListener('message', (msg) => {
    // update default account once it changed
    if (msg.data && msg.data.action === 'privateKeyChanged') {
      sdk.base.getDefaultAccount().then(account => {
        if (account) {
          sdk.base.defaultAccount = account
        }
      })
    }
  })
}

const citaWebDebuggerReadyEvent = new Event("citaWebDebuggerReady")
window.dispatchEvent(citaWebDebuggerReadyEvent)
console.log('CITA Web Debugger Ready')
