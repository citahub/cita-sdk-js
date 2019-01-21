import { EnhancedWeb3 } from '../index'
import handlers from './proxyHandlers'
export default (core: EnhancedWeb3) => {
  core.base.sendTransaction = new Proxy(
    core.base.sendTransaction,
    handlers.sendTransactionHandler
  )
  core.base.getLogs = new Proxy(core.base.getLogs, handlers.getLogsHandler)
  return core
}
