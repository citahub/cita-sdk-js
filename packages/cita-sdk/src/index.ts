import Web3 = require('web3')
import systems from './systems'
import base from './base'
import patchHexToBytes from './utils/patchHexToBytes'
import patchPrivateKeyToAccount from './utils/patchPrivateKeyToAccount'

type CustomWeb3 = typeof Web3

const Core = (provider: string, CustomWeb3: CustomWeb3 = Web3) => {
  const web3 = new CustomWeb3(provider)
  // patch hex to bytes bug of web3@1.0.0
  patchHexToBytes(web3)
  // patch privateKeyToAccount
  patchPrivateKeyToAccount(web3)

  const citaWeb3 = base(web3)
  const systemWeb3 = systems(citaWeb3)

  const target = systemWeb3
  return target
}

export default Core
