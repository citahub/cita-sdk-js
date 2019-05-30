[![Travis](https://travis-ci.org/cryptape/cita-sdk-js.svg?branch=develop)](https://travis-ci.org/cryptape/cita-sdk-js)
![npm (scoped)](https://img.shields.io/npm/v/@cryptape/cita-signer.svg)
[![MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://img.shields.io/npm/v/@cryptape/cita-signer.svg)

[中文文档](https://github.com/cryptape/cita-sdk-js/blob/develop/docs/zh-CN/cita-signer.md)

# cita-signer

This package is the signing module.

### API

```javascript
/**
 * @method signer
 * @desc sign a transaction
 * @param {object} transaction object
 * @param {string} [externalPrivateKey] - if external private key exsits, the one in transaction object will be overriden
 * @return {string} signedTransaction
 */
signer({
  privateKey: '0x7cc34429d268cdf33e1595d9aa3c56bfcb785c24b7f6dd031fe059d93d8e92d9',
  data:
    '6060604052341561000f57600080fd5b60d38061001d6000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c14606e575b600080fd5b3415605857600080fd5b606c60048080359060200190919050506094565b005b3415607857600080fd5b607e609e565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a723058202d9a0979adf6bf48461f24200e635bc19cd1786efbcfc0608eb1d76114d405860029',
  nonce: '47',
  quota: 2.1e13,
  validUntilBlock: 114930,
  version: 2,
  chainId: 1,
  value: '0',
})

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
 *      quota: 1e8,
 *      to: '',
 *      validUntilBlock: 663228,
 *      value: [...],
 *      version: 2,
 *    }
 * }
 */
unsigner(transactionContent)
```

### Basic Usage

```javascript
import signer, { unsigner } from '@cryptape/cita-signer'

const transaction = {
  privateKey: '0x7cc34429d268cdf33e1595d9aa3c56bfcb785c24b7f6dd031fe059d93d8e92d9',
  nonce: 9999999,
  quota: 1e10,
  data:
    '6060604052341561000f57600080fd5b60d38061001d6000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c14606e575b600080fd5b3415605857600080fd5b606c60048080359060200190919050506094565b005b3415607857600080fd5b607e609e565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a723058202d9a0979adf6bf48461f24200e635bc19cd1786efbcfc0608eb1d76114d405860029',
  chainId: 1,
  version: 2,
  validUntilBlock: 999999999,
}

const signed = sign(transaction)
const unsignedTransaction = unsigner(signed)
```

### In the case of no private key

If the transaction has no private key and `web3.eth.accounts.wallet` is empty, the returned msg will be plain transaction.
