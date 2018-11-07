import { EnhancedWeb3 } from '../index'
import handlers from './proxyHandlers'
export default (appchain: EnhancedWeb3) => {
  appchain.base.sendTransaction = new Proxy(
    appchain.base.sendTransaction,
    handlers.sendTransactionHandler
  )
  appchain.base.getLogs = new Proxy(
    appchain.base.getLogs,
    handlers.getLogsHandler
  )
  return appchain
}
