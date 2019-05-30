const chalk = require('chalk')
const cita = require('./cita')
const { privateKey } = require('./config')

const divider = () => console.log(chalk.green('-'.repeat(10)))

const account = cita.base.accounts.privateKeyToAccount(privateKey)

cita.base.getBalance(account.address).then(console.log)

const transaction = {
  from: '0XB4061FA8E18654A7D51FEF3866D45BB1DC688717',
  privateKey,
  nonce: 999999,
  quota: 1e8,
  chainId: 1,
  version: 2,
  validUntilBlock: 999999,
  value: ''
}

const transfer = async (to, value) => {
  checkBalance(to)
  const current = await cita.base.getBlockNumber()
  const tx = {
    ...transaction,
    to,
    value,
    validUntilBlock: +current + 88
  }

  console.log(chalk.green.bold(`Transaction to ${to} with value ${value}`))
  const result = await cita.base.sendTransaction(tx)
  console.log(chalk.green.bold('Received Result:'))
  console.log(chalk.blue(JSON.stringify(result, null, 2)))
  setTimeout(() => {
    checkBalance(to)
  }, 6000)
}

const checkBalance = async to => {
  const balance = await cita.base.getBalance(to, 'pending')
  console.log(chalk.green.bold(`Now ${to} has balance of ${balance}`))
}

const to = '0x46a23e25df9a0f6c18729dda9ad1af3b6a131161'

transfer(to, '0x10')
