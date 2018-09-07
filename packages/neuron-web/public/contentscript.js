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
    window.postMessage({
      action: 'returnAccounts',
      data: _accounts
    }, "*")
  }
  if (data.action === 'getDefaultAccount') {
    window.postMessage({
      action: 'returnDefaultAccount',
      data: _accounts[0] || null
    }, "*")
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
  if (['returnTransactionReceipt', 'privateKeyChanged'].includes(message.action)) {
    window.postMessage(message, "*")
  }
})
