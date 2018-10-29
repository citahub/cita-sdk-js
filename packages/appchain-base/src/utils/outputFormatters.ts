var utils = require('web3-utils')
export const outputAbiFormatter = (_abi: string) => {
  if (typeof _abi !== 'string') throw new Error('Malformed ABI')

  const abiStr = utils.hexToUtf8(_abi)
  try {
    const abi = JSON.parse(abiStr)
    return abi
  } catch (err) {
    throw new Error('Malformed ABI')
  }
}
