import { EnhancedWeb3 } from '../base'
import { ReservedAddr } from './config'
import abis from './abis'

const systemContracts = [
  'admin',
  'authorization',
  'batchTx',
  'chainManager',
  'emergencyBrake',
  'groupManagement',
  'nodeManager',
  'permissionManagement',
  'priceManager',
  'quotaManager',
  'roleManagement',
  'sysConfig',
  'versionManager'
]

const manageGen = (core: any, contract: string) => {
  return new core.base.Contract(abis[contract], ReservedAddr[contract])
}

const system = (web3: EnhancedWeb3) => {
  const contracts: any = {}
  systemContracts.forEach((systemContract: string) => {
    contracts[systemContract] = manageGen(web3, systemContract)
  })
  return Object.assign(web3, { system: contracts })
}
export default system
