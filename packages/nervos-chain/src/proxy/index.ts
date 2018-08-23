const hexToBytesHandler = {
  apply: function(target: Function, _: any, argumentsList: string[]) {
    let hex =
      argumentsList[0] !== undefined ? argumentsList[0].replace(/^0x/, '') : ''
    hex = hex.length % 2 ? '0' + hex : hex

    return target('0x' + hex)
  }
}

export default {
  hexToBytesHandler
}
