import Web3 from 'web3'
import { Provider } from 'web3/types'
import systems from './systems'
import appchain from './appchain'

type CustomWeb3 = typeof Web3

const NervosWeb3 = (
  provider: Provider | string,
  CustomWeb3: CustomWeb3 = Web3
) => {
  const web3 = new CustomWeb3(provider)

  const appchainWeb3 = appchain(web3)
  const systemWeb3 = systems(appchainWeb3)

  const target = systemWeb3
  return target
}

export default NervosWeb3
