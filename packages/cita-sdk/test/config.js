const CITASDK = require('../lib').default
require('dotenv').config()
const { SERVER, PRIVATE_KEY: privateKey } = process.env

const citaSDK = CITASDK(SERVER)

const bytecode =
  '6060604052341561000f57600080fd5b60d38061001d6000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c14606e575b600080fd5b3415605857600080fd5b606c60048080359060200190919050506094565b005b3415607857600080fd5b607e609e565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a723058202d9a0979adf6bf48461f24200e635bc19cd1786efbcfc0608eb1d76114d405860029'
const abi = JSON.parse(
  '[{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]'
)

const account = citaSDK.base.accounts.privateKeyToAccount(privateKey)
citaSDK.base.accounts.wallet.add(account)

const from = account.address

const tx = {
  from,
  data: bytecode,
  nonce: 999999,
  quota: 1e8,
  chainId: 1,
  version: 2,
  validUntilBlock: 999999,
  value: '0x0'
}

module.exports = {
  citaSDK,
  from,
  privateKey,
  tx,
  abi,
  bytecode
}
