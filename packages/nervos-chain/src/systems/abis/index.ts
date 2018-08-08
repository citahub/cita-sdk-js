import admin from './admin'
import authorization from './authorization'
import chainManager from './chainManager'
import groupManagement from './groupManagement'
import nodeManager from './nodeManager'
import permissionManagement from './permissionManagement'
import quotaManager from './quotaManager'

interface ABI {
  constant?: boolean
  inputs?: { name: string; type: string; indexed?: boolean }[]
  name?: string
  outputs?: { name: string; type: string }[]
  payable?: boolean
  stateMutability?: string
  type?: string
  anonymous?: boolean
}

const abis: { [index: string]: ABI[] } = {
  admin,
  authorization,
  chainManager,
  groupManagement,
  nodeManager,
  permissionManagement,
  quotaManager
}

export default abis
