[![Travis](https://travis-ci.org/cryptape/nervos.js.svg?branch=develop)](https://travis-ci.org/cryptape/nervos.js)
![npm](https://img.shields.io/npm/v/@nervos/chain.svg)
[![AppChain](https://img.shields.io/badge/made%20for-Nervos%20AppChain-blue.svg)](https://appchain.nervos.org)

# About

`@nervos/chain` is a high-order function takes `provider` and `Web3 Class`(optional) as inputs, returns nervos-supported web3 instance, methods of `nervos.utils`, `nervos.eth`, `nervos.shh`, `nervos.bzz` are same as [web3](https://web3js.readthedocs.io/en/1.0/getting-started.html)

# Version

`@nervos/chain` strictly abides by Semver, and is compatible with [CITA](https://github.com/cryptape/cita) by `MAJOR` and `MINOR` version, e.g. `@nervos/chain@0.17.x` will work perfectly with `CITA@0.17`

# Getting Started

To use `@nervos/chain', you can add it via npm

```shell
yarn add @nervos/chain
```

or to link it in browser directly with

```html
<script src="node_modules/@nervos/chain/lib/bundle.js" />
```

# Add `nervos.js`

```javascript
import Nervos from '@nervos/chain'
const nervos = Nervos('http://localhost:1337')
```

# AppChain

`nervos.appchain` allows you to interact with an Nervos Appchain and Nervos Smart Contract.

## RPC API Reference

### peerCount

```javascript
/**
 * @method peerCount
 * @desc inquire peer count of appchain
 * @param null
 * @return {Promise<string>} Promise returns peer count
 */
nervos.appchain.peerCount()
```

### getMetaData

```javascript
/**
 * @method getMetaData
 * @desc inquire metadata of appchain, including `chainId`, `chainName`, `operator`, `website`, `genesisTimestamp`, `validators`, `blockInterval`, `tokenName`, `tokenSymbol`, `tokenAvatar`
 * @param null
 * @return {Promise<object>} Promise returns metadata
 */
nervos.appchain.getMetaData()
```

### getAbi

```javascript
/**
 * @method getAbi
 * @param {string} - contract address
 * @param {string} - block number
 * @return {Promise<abi>} Promise returns abi
 */
nervos.appchain.getAbi('0xb3f940e3b5F0AA26dB9f86F0824B3581fE18E9D7', 'latest')
```

### getCode

```javascript
/**
 * @method getAbi
 * @param {string} - contract address
 * @param {string} - block number
 * @return {Promise<string>} Promise returns code
 */
nervos.appchain.getCode('0xb3f940e3b5F0AA26dB9f86F0824B3581fE18E9D7', 'latest')
```

### getBalance

```javascript
/**
 * @method getBalance
 * @param {string} - account address
 * @return {Promise<BN>} Promise returns balance
 */
nervos.appchain.getBalance('0xb3f940e3b5F0AA26dB9f86F0824B3581fE18E9D7')
```

### getAccounts

```javascript
// TODO:
```

### getBlock

```javascript
/**
 * @method getBlock
 * @param {string|number} - block hash or block number
 * @return {Promise<Block>} Promise returns block
 */
nervos.appchain.getBlock(0)
```

### getBlockByNumber

```javascript
/**
 * @method getBlockByNumber
 * @param {number} - block number
 * @return {Promise<Block>} Promise returns block
 */
nervos.appchain.getBlockByNumber(0)
```

### getBlockByHash

```javascript
/**
 * @method getBlockByHash
 * @param {string} - block hash
 * @return {Promise<Block>} Promise returns block
 */
nervos.appchain.getBlockByHash('0x0c56def738d15d9dfaad64ad246e8b5fe39e175ce3da308ea1018869522a1a4d')
```

### getBlockNumber

```javascript
/**
 * @method getBlockNumber
 * @param null
 * @return {Promise<number>} Promise returns current block number
 */
nervos.appchain.getBlockNumber()
```

### getBlockTransactionCount

```javascript
// TODO:
```

### getTransactionCount

```javascript
/**
 * @method getTransactionCount
 * @param {string} - account address
 * @return {Promise<number>} Promise returns transaction count of account address
 */
nervos.appchain.getTransactionCount('0xb3f940e3b5F0AA26dB9f86F0824B3581fE18E9D7')
```

### newMessageFilter

```javascript
/**
 * @method newMessageFilter
 * @param {object} - topics object
 * @return {Promise<string>} Promise returns filter id
 */

const topics = {
  topics: ['0x8fb1356be6b2a4e49ee94447eb9dcb8783f51c41dcddfe7919f945017d163bf3'],
}
nervos.appchain.newMessageFilter(topics)
```

### newBlockFilter

```javascript
/**
 * @method newBlockFilter
 * @param null
 * @return {Promise<string>} Promise returns filter id
 */

nervos.appchain.newBlockFilter()
```

### getFilterChanges

```javascript
/**
 * @method getFilterChanges
 * @param {string} - filter id
 * @return {Promise<Array<string>} Promise returns filter logs
 */

nervos.appchain.getFilterChanges('0x1')
```

### getFitlerLogs

```javascript
/**
 * @method getFitlerLogs
 * @param {string} - filter id
 * @return {Promise<Array<string>} Promise returns filter logs
 */

nervos.appchain.getFitlerLogs('0x1')
```

### deleteMessageFilter

```javascript
/**
 * @method deleteMessageFilter
 * @param {string} - filter id
 * @return {Promise<boolean>} Promise returns success
 */

nervos.appchain.deleteMessageFilter('0x1')
```

### sign

```javascript
/**
 * @method sign
 * @desc sign message in wallet
 * @param {string} - message to sign
 * @param {string} - address of specified account
 * @return {Promise<string>} Promise returns signed message
 */

nervos.appchain.sign(message, address)
```

### personal.sign

```javascript
/**
 * @method personal.sign
 * @desc sign message in wallet
 * @param {string} - message to sign
 * @param {string} - address of specified account
 * @param {string} - password of specified account
 * @return {Promise<string>} Promise returns signed message
 */

nervos.appchain.personal.sign(message, address, password)
```

### sendTransaction

```javascript
/**
 * @method sendTransaction
 * @desc send transaction to appchain, if transaction including `privateKey`, it will sign the transaction locally, otherwise the transaction will be send to node and signed remote.
 * @param {object} - transaction object
 * @return {Promise<object>} Promise returns transaction hash
 */

nervos.appchain.sendTransaction(transaction)
```

### sendSignedTransaction

```javascript
/**
 * @method sendSignedTransaction
 * @desc send signed transaction to appchain
 * @param {string} - signed transaction message
 * @return {Promise<object>} Promise returns transaction hash
 */

nervos.appchain.sendSignedTransaction(signedTransaction)
```

### getTransactionReceipt

```javascript
/**
 * @method getTransactionReceipt
 * @desc inquire transaction receipt
 * @param {string} - transaction hash
 * @return {Promise<object>} Promise returns transaction receipt
 */

nervos.appchain.getTransactionReceipt(transactionHash)
```

### getTransaction

```javascript
/**
 * @method getTransaction
 * @desc inquire transaction
 * @param {string} - transaction hash
 * @return {Promise<object>} Promise returns transaction
 */

nervos.appchain.getTransaction(transactionHash)
```

## Contract Reference

### Deploy Contract

```javascript
const bytecode =
  '6060604052341561000f57600080fd5b60d38061001d6000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c14606e575b600080fd5b3415605857600080fd5b606c60048080359060200190919050506094565b005b3415607857600080fd5b607e609e565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a723058202d9a0979adf6bf48461f24200e635bc19cd1786efbcfc0608eb1d76114d405860029'
const privateKey = '0x...........'
const transaction = {
  from: '0xb4061fA8E18654a7d51FEF3866d45bB1DC688717',
  privateKey,
  nonce: 999999,
  quota: 1000000,
  chainId: 1,
  version: 0,
  validUntilBlock: 999999,
  value: '0x0',
}
web3.appchain.deploy(bytecode, tx)
// or web3.appchain.deploy({code, types, args}, tx) if the contract should be instantiated with arguments, code => bytecode, type => argsType, args => initialValues
// or txResult = await new web3.appchain.Contract(abi).deploy({data: bytecode}).send(tx) if you'd like standard web3 api
```

### Store Abi

```javascript
const abi = JSON.parse(
  '[{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]',
)

const receipt = nervos.appchain.storeAbi(contractAddress, abiString, transaction)
```

### Invoke Contract

```javascript
const abi = JSON.parse(
  '[{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]',
)
const contract = new nervos.appchain.Contract(abi, contractAddress)

// call method
contract.methods.get().call()

// send method
contract.methods.set(5).send(transaction)
```

## Utils API

### signer

```javascript
nervos.appchain.signer({
  privateKey: '0x7cc34429d268cdf33e1595d9aa3c56bfcb785c24b7f6dd031fe059d93d8e92d9',
  data:
    '6060604052341561000f57600080fd5b60d38061001d6000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c14606e575b600080fd5b3415605857600080fd5b606c60048080359060200190919050506094565b005b3415607857600080fd5b607e609e565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a723058202d9a0979adf6bf48461f24200e635bc19cd1786efbcfc0608eb1d76114d405860029',
  nonce: '47',
  quota: 999999,
  validUntilBlock: 114930,
  version: 0,
  chainId: 1,
  value: '0',
})
```

### unsigner

```javascript
nervos.appchain.unsigner(transactionContent)
```

### transactionReceiptListener

```javascript
nervos.listeners.listenToTransactionReceipt(result.hash).then(console.log)
```

## System Contracts API

System contracts locating in `nervos.system` can be used as normal contracts.

```javascript
nervos.system.admin
nervos.system.authorization
nervos.system.chainManager
nervos.system.groupManagement
nervos.system.nodeManager
nervos.system.permissionManagement
nervos.system.quotaManager
```

Corresponding methods can be found [here](https://docs.nervos.org/cita/#/system_management/node)
