const chalk = require('chalk')
const web3 = require('./web3')
const { privateKey, bytecode, abi } = require('./config')

const divider = () => console.log(chalk.green('-'.repeat(10)))

const account = web3.eth.accounts.privateKeyToAccount(privateKey)
web3.base.getBalance(account.address).then(console.log)

const transaction = {
  from: '0xb4061fA8E18654a7d51FEF3866d45bB1DC688717',
  privateKey,
  nonce: '999999',
  quota: 1e8,
  data: bytecode,
  chainId: 1,
  version: 2,
  validUntilBlock: 999999,
  value: '0x0'
}

const deploy = async () => {
  const current = await web3.base.getBlockNumber()
  const tx = {
    ...transaction,
    validUntilBlock: +current + 88
  }
  console.log(chalk.green.bold('Sending Trasnaction'))
  divider()
  console.log(chalk.green(JSON.stringify(tx, null, 2)))
  // method 1, standard web3 api
  // create contract ins
  const myContract = new web3.base.Contract(abi)

  // deploy myContract to CITA and get transaction result
  const txRes = await myContract
    .deploy({
      data: bytecode,
      arguments: [10]
    })
    .send(tx)
  console.log(chalk.blue.bold('Received Transaction Result'))
  divider()
  console.log(chalk.blue(JSON.stringify(txRes, null, 2)))

  // get transaction receipt
  const receipt = await web3.listeners.listenToTransactionReceipt(txRes.hash)
  console.log(chalk.blue.bold('Received Transaction Receipt'))
  divider()
  console.log(chalk.blue(JSON.stringify(receipt, null, 2)))
  // set contract address to myContract
  myContract.options.address = receipt.contractAddress
  return myContract

  // method 2, step by step
  // const res = await web3.base.deploy(tx.data, tx)
  // console.log(chalk.blue.bold('Received Result'))
  // divider()
  // console.log(chalk.blue(JSON.stringify(res, null, 2)))
  // const contract = new web3.base.Contract(abi, res.contractAddress)
  // return contract
}

const callMethod = async contract => {
  console.log(chalk.green.bold('call method'))
  divider()
  const res = await contract.methods.get().call()
  console.log(chalk.blue.bold('Received'))
  console.log(chalk.blue(res))
}

const setMethod = async contract => {
  console.log(chalk.green.bold('Call Send Method'))
  divider()
  const current = await web3.base.getBlockNumber()
  const tx = {
    ...transaction,
    validUntilBlock: +current + 88
  }
  const res = await contract.methods.set(5).send(tx)
  console.log(chalk.blue.bold('Received Send Result'))
  console.log(chalk.blue(JSON.stringify(res, null, 2)))
  setTimeout(() => {
    callMethod(contract)
  }, 10000)
}

const flow = async () => {
  const contract = await deploy()
  callMethod(contract)
  setMethod(contract)
}

flow()
