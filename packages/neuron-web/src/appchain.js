import AppChain from '@appchain/base'
import {
  pwd,
  chain
} from './config'
const chainIp = window.localStorage.getItem('chainIp') || chain
const appchain = AppChain(chainIp)
appchain.base.accounts.wallet.load(pwd)
window.nervos = appchain
window.appchain = appchain
export default appchain
