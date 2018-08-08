import Web3 from 'web3'
import { Provider } from 'web3/types'
import systems from './systems'
import appchain from './appchain'
// import _executeMethod from './contract'
// import Contract from './contract'

type CustomWeb3 = typeof Web3

const NervosWeb3 = (
  provider: Provider | string,
  CustomWeb3: CustomWeb3 = Web3
) => {
  const web3 = new CustomWeb3(provider)

  // web3.eth.Contract.prototype._executeMethod = _executeMethod
  // web3.appchain.Contract = Contract

  const appchainWeb3 = appchain(web3)
  const systemWeb3 = systems(appchainWeb3)

  const target = systemWeb3
  return target
}

export default NervosWeb3
