import CITASDK from '@citahub/cita-sdk'
import {
  pwd,
  chain
} from './config'
const chainIp = window.localStorage.getItem('chainIp') || chain
const citaSDK = CITASDK(chainIp)
citaSDK.base.accounts.wallet.load(pwd)
window.nervos = citaSDK
window.citaSDK = citaSDK
export default citaSDK
