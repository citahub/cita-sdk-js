import AppChain from './index'

declare global {
  interface Window {
    AppChain: typeof AppChain
  }
}
if (window) {
  window.AppChain = AppChain
}
