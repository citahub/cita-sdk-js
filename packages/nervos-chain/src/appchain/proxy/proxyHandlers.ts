import addPrivateKeyFrom from '../../utils/addPrivateKey'
export const sendTransactionHandler = {
  apply: async function(target: Function, thisArg: any, argumentsList: any) {
    // add private key from wallet if tx not includes one.
    const _tx = argumentsList[0]
    const tx = addPrivateKeyFrom(thisArg.accounts.wallet)(_tx)
    return target(tx)
  }
}

export default {
  sendTransactionHandler
}
