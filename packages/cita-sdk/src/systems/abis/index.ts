import admin from './admin'
import authorization from './authorization'
import batchTx from './batchTx'
import chainManager from './chainManager'
import emergencyBrake from './emergencyBrake'
import groupManagement from './groupManagement'
import nodeManager from './nodeManager'
import permissionManagement from './permissionManagement'
import priceManager from './priceManager'
import quotaManager from './quotaManager'
import roleManagement from './roleManagement'
import sysConfig from './sysConfig'
import versionManager from './versionManager'

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
  batchTx,
  chainManager,
  emergencyBrake,
  groupManagement,
  nodeManager,
  permissionManagement,
  priceManager,
  quotaManager,
  roleManagement,
  sysConfig,
  versionManager
}

export default abis
