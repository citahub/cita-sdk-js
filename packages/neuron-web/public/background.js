// popup neuron web
let appId = null
// dapp
let dappId = null

_nervos = Nervos()

// init _accounts
let _accounts = []

const loadAccounts = () => {
  _nervos.appchain.accounts.wallet.load('')
  _accounts = Array.from(_nervos.appchain.accounts.wallet).map(w => w.address)
  _nervos.appchain.accounts.wallet.clear()
  return _accounts
}
// load accounts
loadAccounts()

const sendMsgToApp = (action, data) => {
  setTimeout(() => {
    chrome.runtime.sendMessage({
      action,
      data: { ...data,
        dappId,
        appId
      }
    })
  }, 500)
}

chrome.windows.onRemoved.addListener(id => {
  if (id === appId) {
    appId === null
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'open') {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      if (tabs[0]) {
        dappId = tabs[0].id
      }
    })
    if (appId) {
      chrome.windows.remove(appId)
    }
    chrome.windows.create({
      url: "index.html#/transactions",
      type: 'popup',
      width: 600,
      height: 700
    }, res => {
      appId = res.id
      sendMsgToApp('confirm', message.data)
    })
  } else if (message.action === 'getAccounts') {
    sendResponse(_accounts)
  } else if (message.action === 'getDefaultAccount') {
    sendResponse(_accounts[0])
  } else if (message.action === 'returnTransactionReceipt') {
    chrome.windows.remove(appId)

    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, res => {});
    });
  } else if (message.action === 'privateKeyChanged') {
    // update accounts when privatekey changed
    loadAccounts()
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, res => {});
    });
  }
})
