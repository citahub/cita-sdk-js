export default (web3: any) => {
  // web3.utils.hexToBytes = hex2bytes
  web3.utils.hexToBytes = new Proxy(web3.utils.hexToBytes, {
    apply: (target: Function, _thisArg: any, argumentsList: string[]) => {
      let hex = ('' + argumentsList[0] || '').replace(/^0x/, '')
      if (hex.length % 2) {
        hex = '0' + hex
      }
      return target('0x' + hex)
    }
  })
}
