import { EnhancedWeb3 } from './index'

const actions = [
  'getTransactionReceipt',
  'getTransaction',
  'getTransactionProof',
  'getFilterChanges'
]

const listener = (core: EnhancedWeb3) => {
  let listeners: { [index: string]: Function } = {}
  // add getTransactionReceipt, getTransaction, getTransactionProof, getFilterChanges
  actions.forEach(action => {
    listeners[`listenTo${action.slice(3)}`] = (
      params: any,
      times: number = 10
    ) => {
      return new Promise((resolve, reject) => {
        let remains = times
        let listener: any = null
        const stopWatching = () => {
          clearInterval(listener)
        }
        listener = setInterval(() => {
          if (!remains) {
            stopWatching()
            reject('No Result Received')
          }
          core.base[action](params).then((res: any) => {
            remains--
            if ((action === 'getFilterChanges' && res.length) || res) {
              clearInterval(listener)
              resolve(res)
            }
          })
        }, 1000)
      })
    }
  })
  core.listeners = listeners
  return core
}

export default listener
