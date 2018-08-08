import { EnhancedWeb3 } from '../appchain'
import { ReservedAddr } from './config'
import abis from './abis'

const systemContracts = [
  'admin',
  'authorization',
  'chainManager',
  'groupManagement',
  'nodeManager',
  'permissionManagement',
  'quotaManager'
]

const manageGen = (web3: any, contract: string) => {
  return new web3.appchain.Contract(abis[contract], ReservedAddr[contract])
}

const system = (web3: EnhancedWeb3) => {
  const contracts: any = {}
  systemContracts.forEach((systemContract: string) => {
    contracts[systemContract] = manageGen(web3, systemContract)
  })
  return Object.assign(web3, { system: contracts })
}
export default system
