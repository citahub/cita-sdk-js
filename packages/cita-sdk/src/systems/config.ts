// https://github.com/cryptape/cita/blob/fece9024b6a02b62452cda3755b2a1ea0026c167/scripts/contracts/contracts.yml
export const ReservedAddr: { [index: string]: string } = {
  admin: '0xffffffffffffffffffffffffffffffffff02000c',
  authorization: '0xffffffffffffffffffffffffffffffffff020006',
  batchTx: '0xffffffffffffffffffffffffffffffffff02000e',
  chainManager: '0xffffffffffffffffffffffffffffffffff020002',
  emergencyBrake: '0xffffffffffffffffffffffffffffffffff02000f',
  group: '0xffffffffffffffffffffffffffffffffff020009',
  groupManagement: '0xffffffffffffffffffffffffffffffffff02000a',
  nodeManager: '0xffffffffffffffffffffffffffffffffff020001',
  permissionManagement: '0xffffffffffffffffffffffffffffffffff020004',
  priceManager: '0xffffffffffffffffffffffffffffffffff020010',
  quotaManager: '0xffffffffffffffffffffffffffffffffff020003',
  roleManagement: '0xffffffffffffffffffffffffffffffffff020007',
  sysConfig: '0xffffffffffffffffffffffffffffffffff020000',
  versionManager: '0xffffffffffffffffffffffffffffffffff020011',
  // trivial
  abiAddress: '0xffffffffffffffffffffffffffffffffff010001'
}
