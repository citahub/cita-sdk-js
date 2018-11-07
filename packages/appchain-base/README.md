[![Travis](https://travis-ci.org/cryptape/appchain.js.svg?branch=develop)](https://travis-ci.org/cryptape/appchain.js)
![npm](https://img.shields.io/npm/v/@appchain/base.svg)
[![MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://img.shields.io/npm/v/@appchain/base.svg)
[![AppChain](https://img.shields.io/badge/made%20for-Nervos%20AppChain-blue.svg)](https://appchain.nervos.org)

# About

`@appchain/base` is a function takes `provider` and `Web3 Class`(optional) as inputs, returns nervos-supported web3 instance, methods of `appchain.utils`, `appchain.eth`, `appchain.shh`, `appchain.bzz` are same as [web3](https://web3js.readthedocs.io/en/1.0/getting-started.html)

# Version

`@appchain/base` strictly abides by Semver, and is compatible with [CITA](https://github.com/cryptape/cita) by `MAJOR` and `MINOR` version, e.g. `@appchain/base@0.17.x` will work perfectly with `CITA@0.17`

# Prerequisites

## Learn `web3@1.0`

By default, `@appchain/base` acts like [`web3@1.0.0`](https://web3js.readthedocs.io/en/1.0/getting-started.html), and has the same APIs.

## Learn `CITA`

`@appchain/base` works for Nervos AppChain whose kernel is [CITA](https://docs.nervos.org/cita/#/README).

Before using this SDK, following concept should be cast.

1. Transaction Object

Transaction Object to be signed has been defined in [cita-proto](https://github.com/cryptape/cita-proto/blob/master/blockchain.proto#L49)

Transaction Object returned from CITA has been declared [here](https://github.com/cryptape/cita/blob/develop/docs/zh-CN/rpc_guide/rpc.md#gettransaction)

2. Transaction Receipt

[Transaction Receipt](https://github.com/cryptape/cita/blob/develop/docs/zh-CN/rpc_guide/rpc.md#gettransactionreceipt)

3. Block Object

[Block Object](https://github.com/cryptape/cita/blob/develop/docs/zh-CN/rpc_guide/rpc.md#getblockbyhash)

4. MetaData Object

[MetaData Object](https://github.com/cryptape/cita/blob/develop/docs/zh-CN/rpc_guide/rpc.md#getmetadata)

5. ABI

[ABI](https://solidity.readthedocs.io/en/v0.4.25/abi-spec.html)

6. Filter Object

[Filter Object](https://docs.nervos.org/cita/#/rpc_guide/rpc-types?id=filter)

7. Transaction Log

````javascript
Log {
  address: string
  topics: string[]
  data: string
  blockHash: string
  blockNumber: string
  transactionHash: string
  transactionIndex: string
  logIndex: string
  transactionLogIndex: string
  decodedLogs: object
}
``

# Getting Started

To use `@appchain/base', you can add it via npm

```shell
yarn add @appchain/base
````

or to link it in browser directly with

```html
<script src="node_modules/@appchain/base/lib/bundle.js" />
```

# Add `appchain.js`

```javascript
import AppChain from '@appchain/base'
const appchain = AppChain('http://localhost:1337')
```

# AppChain

`appchain.base` allows you to interact with an Nervos AppChain and Nervos Smart Contract.

## RPC API Reference

### peerCount

```javascript
/**
 * @method peerCount
 * @desc request peer count of AppChain
 * @param null
 * @return {Promise<string>} Promise returns peer count
 */
appchain.base.peerCount()
```

### getMetaData

```javascript
/**
 * @method getMetaData
 * @desc request metadata of AppChain, including `chainId`, `chainName`, `operator`, `website`, `genesisTimestamp`, `validators`, `blockInterval`, `tokenName`, `tokenSymbol`, `tokenAvatar`
 * @param null
 * @return {Promise<object>} Promise returns metadata
 * {
 *   "result": {
 *    "website": "https://www.example.com",
 *    "validators": [
 *     "0x71b028e49c6f41aaa74932d703c707ecca6d7321",
 *     "0xee01b9ba97671e8a1891e85b206b499f106822a1",
 *     "0x486bb688c8d29056bd7f87c26733048b0a6abda1",
 *     "0x31042d4f7662cddf8ded5229db3c5e7302875e11"
 *    ],
 *    "tokenSymbol": "NOS",
 *    "tokenName": "Nervos",
 *    "tokenAvatar": "https://avatars1.githubusercontent.com/u/35361817",
 *    "operator": "test-operator",
 *    "number": "0xA2DE3",
 *    "genesisTimestamp": 1532314871400,
 *    "chainName": "test-chain",
 *    "chainId": 1,
 *    "blockInterval": 3000
 *   }
 * }
 */
appchain.base.getMetaData()
```

### getAbi

```javascript
/**
 * @method getAbi
 * @desc request abi object from the AppChain
 * @param {string} - contract address
 * @param {string} - block number
 * @return {Promise<Abi>} Promise returns abi
 */
appchain.base.getAbi('0xb3f940e3b5F0AA26dB9f86F0824B3581fE18E9D7', 'latest')
```

### getCode

```javascript
/**
 * @method getCode
 * @desc request contract code from the AppChain
 * @param {string} - contract address
 * @param {string} - block number
 * @return {Promise<string>} Promise returns code
 */
appchain.base.getCode('0xb3f940e3b5F0AA26dB9f86F0824B3581fE18E9D7', 'latest')
```

### getBalance

```javascript
/**
 * @method getBalance
 * @desc request balance of specified account
 * @param {string} - account address
 * @return {Promise<BN>} Promise returns balance
 */
appchain.base.getBalance('0xb3f940e3b5F0AA26dB9f86F0824B3581fE18E9D7')
```

### getAccounts

```javascript
// TODO:
```

### getBlock

```javascript
/**
 * @method getBlock
 * @desc request block of specified hash or number
 * @param {string|number} - block hash or block number
 * @return {Promise<Block>} Promise returns block
 */
appchain.base.getBlock(0)
```

### getBlockByNumber

```javascript
/**
 * @method getBlockByNumber
 * @desc request block of specified number
 * @param {number} - block number
 * @return {Promise<Block>} Promise returns block
 */
appchain.base.getBlockByNumber(0)
```

### getBlockByHash

```javascript
/**
 * @method getBlockByHash
 * @desc request block of specified hash
 * @param {string} - block hash
 * @return {Promise<Block>} Promise returns block
 */
appchain.base.getBlockByHash('0x0c56def738d15d9dfaad64ad246e8b5fe39e175ce3da308ea1018869522a1a4d')
```

### getBlockNumber

```javascript
/**
 * @method getBlockNumber
 * @desc request current block number of AppChain
 * @param null
 * @return {Promise<number>} Promise returns current block number
 */
appchain.base.getBlockNumber()
```

### getBlockTransactionCount

```javascript
// TODO:
```

### getTransactionCount

```javascript
/**
 * @method getTransactionCount
 * @desc get transaction account of specified account
 * @param {string} - account address
 * @return {Promise<number>} Promise returns transaction count of account address
 */
appchain.base.getTransactionCount('0xb3f940e3b5F0AA26dB9f86F0824B3581fE18E9D7')
```

### getLogs

```javascript
/**
 * @method getLogs
 * @desc get logs by filter object and abi
 * @param {object} - filter object
 * @param {object} - [abi], event abi
 * @return {Promise<logs>} Promise returns logs of block or transaction
 */

const abi = [
  {
    indexed: false,
    name: '_sender',
    type: 'address',
  },
  {
    indexed: false,
    name: '_text',
    type: 'string',
  },
  {
    indexed: true,
    name: '_time',
    type: 'uint256',
  },
]
const filter = {
  address: '0x35bD452c37d28becA42097cFD8ba671C8DD430a1',
  fromBlock: '0x0',
}
web3.appchain.getLogs(filter, abi).then(console.log)
```

### newMessageFilter

```javascript
/**
 * @method newMessageFilter
 * @desc creates a filter object, based on filter options, to notify when the state changes (logs). To check if the state has changed, call getFilterChanges.
 * @param {object} - topics object
 * @return {Promise<string>} Promise returns filter id
 */

const topics = {
  topics: ['0x8fb1356be6b2a4e49ee94447eb9dcb8783f51c41dcddfe7919f945017d163bf3'],
}
appchain.base.newMessageFilter(topics)
```

### newBlockFilter

```javascript
/**
 * @method newBlockFilter
 * @desc creates a filter in the node, to notify when a new block arrives. To check if the state has changed, call getFilterChanges.
 * @param null
 * @return {Promise<string>} Promise returns filter id
 */

appchain.base.newBlockFilter()
```

### getFilterChanges

```javascript
/**
 * @method getFilterChanges
 * @desc polling method for a filter, which returns an array of logs which occurred since last poll. If parameter is a block filter id, it will return an array of block hashes, otherwise it will return an array of transaction logs
 * @param {string} - filter id
 * @return {Promise<Array<string>} Promise returns filter logs
 */

appchain.base.getFilterChanges('0x1')
```

### getFitlerLogs

```javascript
/**
 * @method getFitlerLogs
 * @desc Returns an array of all logs matching filter with given id.
 * @param {string} - filter id
 * @return {Promise<Array<string>} Promise returns filter logs
 */

appchain.base.getFitlerLogs('0x1')
```

### deleteMessageFilter

```javascript
/**
 * @method deleteMessageFilter
 * @desc remove a filter with given id. Should always be called when watch is no longer needed. Additonally Filters timeout when they aren't requested with getFilterChanges for a period of time.
 * @param {string} - filter id
 * @return {Promise<boolean>} Promise returns success
 */

appchain.base.deleteMessageFilter('0x1')
```

### sign

```javascript
/**
 * @method sign
 * @desc sign message by wallet
 * @param {string} - message to sign
 * @param {string} - address of specified account
 * @return {Promise<string>} Promise returns signed message
 */

appchain.base.sign('hello', '0x6fc32e7bdcb8040c4f587c3e9e6cfcee4025ea58')
```

### personal.sign

```javascript
/**
 * @method personal.sign
 * @desc sign message by wallet
 * @param {string} - message to sign
 * @param {string} - address of specified account
 * @param {string} - password of specified account
 * @return {Promise<string>} Promise returns signed message
 */

appchain.base.personal.sign('message', '0x6fc32e7bdcb8040c4f587c3e9e6cfcee4025ea58', 'password')
```

### sendTransaction

```javascript
/**
 * @method sendTransaction
 * @desc send transaction to AppChain, if transaction including `privateKey`, or wallet has been set, it will sign the transaction locally, otherwise the transaction will be send to node and signed remote.
 * @param {object} - transaction object
 * @return {Promise<object>} Promise returns transaction hash object
 */

appchain.base.sendTransaction(transaction)
```

### sendSignedTransaction

```javascript
/**
 * @method sendSignedTransaction
 * @desc send signed transaction to AppChain
 * @param {string} - signed transaction message
 * @return {Promise<object>} Promise returns transaction hash object
 */

appchain.base.sendSignedTransaction('signedTransaction')
```

### getTransactionReceipt

```javascript
/**
 * @method getTransactionReceipt
 * @desc request transaction receipt
 * @param {string} - transaction hash
 * @return {Promise<object>} Promise returns transaction receipt object
 */

appchain.base.getTransactionReceipt('0xe418a9cf4f4257aaed8c4c1259d30fb41ea650f4b4ef95ebb28cb3b29ccb1d91')
```

```javascript
/**
 * @method getTransactionProof
 * @desc request transaction proof
 * @param {string} - transaction hash
 * @return {Promise<string>} Promise returns transaction proof
 */

appchain.base.getTransactionProof('0xe418a9cf4f4257aaed8c4c1259d30fb41ea650f4b4ef95ebb28cb3b29ccb1d91')
```

### getTransaction

```javascript
/**
 * @method getTransaction
 * @desc request transaction by hash
 * @param {string} - transaction hash
 * @return {Promise<object>} Promise returns transaction object
 */

appchain.base.getTransaction('0x6fc32e7bdcb8040c4f587c3e9e6cfcee4025ea58')
```

## Contract Reference

### Deploy Contract

```javascript
const abi = JSON.parse(
  '[{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]',
)
const bytecode =
  '6060604052341561000f57600080fd5b60d38061001d6000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c14606e575b600080fd5b3415605857600080fd5b606c60048080359060200190919050506094565b005b3415607857600080fd5b607e609e565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a723058202d9a0979adf6bf48461f24200e635bc19cd1786efbcfc0608eb1d76114d405860029'
const privateKey = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
const transaction = {
  from: '0xb4061fA8E18654a7d51FEF3866d45bB1DC688717',
  privateKey,
  nonce: 999999,
  quota: 1e10,
  chainId: 1,
  version: 0,
  validUntilBlock: 999999,
  value: '0x0',
}
// create contract instance
const myContract = new web3.appchain.Contract(abi)

// deploy contract and get transaction result
const txRes = await myContract
  .deploy({
    data: bytecode,
    arguments: [],
  })
  .send(tx)

// get transaction receipt by transaction hash
const receipt = await web3.listeners.listenToTransactionReceipt(txRes.hash)

// set contract address to contract instance
myContract.options.address = receipt.contractAddress
```

### Store Abi

```javascript
/**
 * @method storeAbi
 * @desc send contract abi to AppChain
 * @param {string} - contract hash
 * @param {abi} - abi object
 * @return {Promise<object>} Promise returns transaction receipt object
 */
const contractAddress = '0x6fc32e7bdcb8040c4f587c3e9e6cfcee4025ea58'
const abi = JSON.parse(
  '[{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]',
)

const receipt = appchain.base.storeAbi(contractAddress, abi, transaction)
```

### Use Contract

```javascript
const abi = JSON.parse(
  '[{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]',
)
const contract = new appchain.base.Contract(abi, contractAddress)

// call method
// get method is specified by contract through abi
// contract.methods.myMethod(paramters).call(transaction)
contract.methods.get().call()

// send method
// set method is specified by contract through abi
// contract.methods.myMethod(parameters).send(transaction)
contract.methods.set(5).send(transaction)
```

## Utils API

### signer

```javascript
/**
 * @method signer
 * @desc sign a transaction
 * @param {object} transaction object
 * @param {string} [externalPrivateKey] - if external private key exsits, the one in transaction object will be overriden
 * @return {string} signedTransaction
 */
appchain.base.signer({
  privateKey: '0x7cc34429d268cdf33e1595d9aa3c56bfcb785c24b7f6dd031fe059d93d8e92d9',
  data:
    '6060604052341561000f57600080fd5b60d38061001d6000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c14606e575b600080fd5b3415605857600080fd5b606c60048080359060200190919050506094565b005b3415607857600080fd5b607e609e565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a723058202d9a0979adf6bf48461f24200e635bc19cd1786efbcfc0608eb1d76114d405860029',
  nonce: '47',
  quota: 2.1e13,
  validUntilBlock: 114930,
  version: 0,
  chainId: 1,
  value: '0',
})
```

### unsigner

```javascript
/**
 * @method unsigner
 * @desc unsign a signed transaction
 * @param {string} signed transaction
 * @return {object} unsigned transaction
 * {
 *    crypot: 0,
 *    sender: {
 *      address: 'f74b3a9c67d4b657dd335e1d5f57e7ef7d160470',
 *      publicKey: '708e8f442b8b94735d09c7f32eb05c0831f1f888dbbde5f979c0fd0613808facb857207c420b1c75a62612995a78455c2c21756e28a0a1c881d62ea3d6f975f0',
 *    },
 *    signature: '9941c2619195b833b3292a6aeb5aa568ee0a8cd5eef67e1ff77612c87121b65866483ba0c79d88445ad368459c600fbf52b6d0c20aaa507ecdaf233ff4cf2c4701',
 *    transaction: {
 *      chainId: 1,
 *      data: [...],
 *      nonce: '2e96d7a387092faa' ,
 *      quota: 1e10,
 *      to: '',
 *      validUntilBlock: 663228,
 *      value: [...],
 *      version: 0,
 *    }
 * }
 */
appchain.base.unsigner(transactionContent)
```

### transactionReceiptListener

```javascript
/**
 * @method listenToTransactionReceipt
 * @desc listen to transaction receipt by hash
 * @param {string} transaction hash
 * @return {Promise<object>} transaction receipt object
 */
appchain.listeners.listenToTransactionReceipt(result.hash).then(console.log)
```

## System Contracts API

System contracts locating in `appchain.system` can be used as normal contracts.

```javascript
appchain.system.admin
appchain.system.authorization
appchain.system.batchTx
appchain.system.chainManager
appchain.system.emergencyBrake
appchain.system.groupManagement
appchain.system.nodeManager
appchain.system.permissionManagement
appchain.system.priceManager
appchain.system.quotaManager
appchain.system.roleManagement
appchain.system.sysConfig
appchain.system.versionManage
```

Corresponding methods can be found [here](https://docs.nervos.org/cita/#/contracts_guide/sys)

## Additional Utils

```javascript
/**
 * @function isPrivateKey
 * @desc check if private key is in right format
 * @param {string} - privateKey
 * @return {boolean} - valid
 */
const valid = appchain.utils.isPrivateKey('0x7cc34429d268cdf33e1595d9aa3c56bfcb785c24b7f6dd031fe059d93d8e92d')
```
