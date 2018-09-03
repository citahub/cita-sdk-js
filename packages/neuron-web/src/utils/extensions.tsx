export const sendMessageToContentScript = (tabId: number, msg: any, cb: any) => {
  chrome.tabs.sendMessage(tabId, msg, res => {
    if (cb) {
      cb(res)
    }
  })
}

export const sendMessageToRuntime = (msg: any, cb: any) => {
  chrome.runtime.sendMessage(msg, cb)
}
