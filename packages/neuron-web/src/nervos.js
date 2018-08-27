import Nervos from '@nervos/chain'
import {
  pwd,
  chain
} from './config'
const chainIp = window.localStorage.getItem('chainIp') || chain
const nervos = Nervos(chainIp)
nervos.appchain.accounts.wallet.load(pwd)
window.nervos = nervos
export default nervos
