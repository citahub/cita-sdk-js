const chalk = require('chalk')
const web3 = require('./web3')
const {
  privateKey
} = require('./config')

// const myPrivateKey = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
// const myAccount = web3.eth.accounts.privateKeyToAccount(myPrivateKey);

const divider = () => console.log(chalk.green('-'.repeat(10)))

const account = web3.eth.accounts.privateKeyToAccount(privateKey)

web3.appchain.getBalance(account.address).then(console.log)

const transaction = {
  from: '0XB4061FA8E18654A7D51FEF3866D45BB1DC688717',
  privateKey,
  nonce: 999999,
  quota: 1000000,
  chainId: 1,
  version: 0,
  validUntilBlock: 999999,
  value: ''
}

const transfer = async (to, value) => {
  checkBalance(to)
  const current = await web3.appchain.getBlockNumber()
  const tx = {
    ...transaction,
    to,
    value,
    validUntilBlock: +current + 88
  }

  console.log(chalk.green.bold(`Transaction to ${to} with value ${value}`))
  const result = await web3.appchain.sendTransaction(tx)
  console.log(chalk.green.bold('Received Result:'))
  console.log(chalk.blue(JSON.stringify(result, null, 2)))
  setTimeout(() => {
    checkBalance(to)
  }, 6000)
}

const checkBalance = async to => {
  const balance = await web3.appchain.getBalance(to)
  console.log(chalk.green.bold(`Now ${to} has balance of ${balance}`))
}

// const to = '0xb4061fa8e18654a7d51fef3866d45bb1dc688710';
const to = '0xb4061fa8e18654a8d51fef3866d45bb1dc688719'
// const v = 10000 * 10 ** 18
// const hv = web3.utils.numberToHex(v)
// console.log(hv)
// v = web3.utils.numberToHex('1000000000000000000000')

transfer(to, '0x10')
