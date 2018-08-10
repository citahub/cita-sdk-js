[![Travis](https://travis-ci.org/cryptape/nervos.js.svg?branch=develop)](https://travis-ci.org/cryptape/nervos.js)
![npm (scoped)](https://img.shields.io/npm/v/@nervos/signer.svg)

# nervos-signer

This package is the signing module. 

### Basic Usage

```javascript
import signer from '@nervos/signer'

const transaction = {
  privateKey: '0x7cc34429d268cdf33e1595d9aa3c56bfcb785c24b7f6dd031fe059d93d8e92d9',
  nonce: 9999999,
  quota: 100,
  data:
    '6060604052341561000f57600080fd5b60d38061001d6000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c14606e575b600080fd5b3415605857600080fd5b606c60048080359060200190919050506094565b005b3415607857600080fd5b607e609e565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a723058202d9a0979adf6bf48461f24200e635bc19cd1786efbcfc0608eb1d76114d405860029',
  chainId: 1,
  version: 0,
  validUntilBlock: 999999999,
}

const signed = sign(transaction)
```

### In the case of no private key

If the transaction has no private key and `web3.eth.accounts.wallet` is empty, the returned msg will be plain transaction.
