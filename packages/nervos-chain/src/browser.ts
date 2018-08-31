import Nervos from './index'

declare global {
  interface Window {
    Nervos: typeof Nervos
  }
}
if (window) {
  window.Nervos = Nervos
}
