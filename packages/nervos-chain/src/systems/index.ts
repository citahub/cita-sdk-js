import { EnhancedWeb3 } from '../appchain'
import { ReservedAddr } from './config'

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
  const abi = require(`./abis/${contract}.json`)
  return new web3.appchain.Contract(abi, ReservedAddr[contract])
}

const system = (web3: EnhancedWeb3) => {
  const contracts: any = {}
  systemContracts.forEach((systemContract: string) => {
    contracts[systemContract] = manageGen(web3, systemContract)
  })
  return Object.assign(web3, { system: contracts })
}
export default system
