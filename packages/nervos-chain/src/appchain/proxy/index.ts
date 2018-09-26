import { EnhancedWeb3 } from '../index'
import handlers from './proxyHandlers'
export default (web3: EnhancedWeb3) => {
  web3.appchain.sendTransaction = new Proxy(
    web3.appchain.sendTransaction,
    handlers.sendTransactionHandler
  )
  web3.appchain.getLogs = new Proxy(
    web3.appchain.getLogs,
    handlers.getLogsHandler
  )
  return web3
}
