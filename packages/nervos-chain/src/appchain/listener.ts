import { EnhancedWeb3 } from './index'

const actions = [
  'getTransactionReceipt',
  'getTransaction',
  'getTransactionProof',
  'getFilterChanges'
]

const listener = (web3: EnhancedWeb3) => {
  let listeners: { [index: string]: Function } = {}
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
          web3.appchain[action](params).then((res: any) => {
            remains--
            if (res) {
              clearInterval(listener)
              resolve(res)
            }
          })
        }, 1000)
      })
    }
  })
  web3.listeners = listeners
  return web3
}

export default listener
