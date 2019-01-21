import CITASDK from './index'

declare global {
  interface Window {
    CITASDK: typeof CITASDK
  }
}
if (window) {
  window.CITASDK = CITASDK
}
