import addPrivateKeyFrom from '../../utils/addPrivateKey'
import { Log, LogParser } from '../../utils/parsers'
export const sendTransactionHandler = {
  apply: async function(target: Function, thisArg: any, argumentsList: any) {
    const _tx = argumentsList[0]
    const tx = addPrivateKeyFrom(thisArg.accounts.wallet)(_tx)
    return target(tx)
  }
}

export const getLogsHandler = {
  apply: async function(target: Function, _thisArg: any, argumentsList: any) {
    const filter = argumentsList[0]
    const abi = argumentsList[1]
    return target(filter).then((logs: Log[] | string[]) => {
      if (!abi) {
        return logs
      } else {
        try {
          const decodedLogs = [...logs].map((log: Log | string) =>
            LogParser(log, abi)
          )
          return decodedLogs
        } catch (e) {
          console.warn(e.message)
          return logs
        }
      }
    })
  }
}

export default {
  sendTransactionHandler,
  getLogsHandler
}
