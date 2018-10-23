// 向页面注入JS
const files = ['bundle.js', 'inject.js']
let fIdx = 0
let panelId = null

function injectCustomJs() {
  if (fIdx === files.length) return
  jsPath = chrome.extension.getURL(files[fIdx]);
  const temp = document.createElement('script');
  temp.setAttribute('type', 'text/javascript');
  temp.src = jsPath
  temp.onload = function () {
    this.parentNode.removeChild(this);
    fIdx++
    injectCustomJs()
  };
  document.body.appendChild(temp);
}

injectCustomJs()

const _nervos = Nervos()
_nervos.appchain.accounts.wallet.load('')
const _accounts = Array.from(_nervos.appchain.accounts.wallet).map(w => w.address)

window.addEventListener('message', (e) => {
  const {
    data
  } = e
  if (data.action === 'getAccounts') {
    chrome.runtime.sendMessage({
        action: 'getAccounts',
      },
      res => {
        window.postMessage({
          action: 'returnAccounts',
          data: res
        }, "*")
      }
    )
  }
  if (data.action === 'getDefaultAccount') {
    chrome.runtime.sendMessage({
      action: 'getDefaultAccount'
    }, res => {
      window.postMessage({
        action: 'returnDefaultAccount',
        data: res || null
      }, "*")
    })
  }
  if (data.action === 'manifest') {
    chrome.runtime.sendMessage(
      data
    )
  }
  if (data.action === 'sign') {
    chrome.runtime.sendMessage(data, res => {
      if (!!data.fromAccount) {
        return chrome.runtime.sendMessage({
          action: 'open',
          data,
        }, console.log)
      }
    })
  }
  if (data.action === 'sendTransaction') {
    chrome.runtime.sendMessage(data, res => {
      if (data.transaction) {
        return chrome.runtime.sendMessage({
          action: 'open',
          data,
        }, console.log)
      }
    })
  }
})

chrome.runtime.onMessage.addListener((message, sender, res) => {
  if (['returnTransactionReceipt', 'privateKeyChanged', 'returnSignedMessage'].includes(message.action)) {
    window.postMessage(message, "*")
  }
})
