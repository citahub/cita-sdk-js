export default (web3: any) => {
  web3.eth.accounts.privateKeyToAccount = new Proxy(
    web3.eth.accounts.privateKeyToAccount,
    {
      apply: (target: Function, _thisArg: any, argumentsList: string[]) => {
        let privateKey = argumentsList[0]
        if (privateKey && privateKey.length === 64) {
          privateKey = '0x' + privateKey
        }
        return target.call(_thisArg, privateKey)
      }
    }
  )
}
