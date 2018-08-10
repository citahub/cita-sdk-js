[![Travis](https://travis-ci.org/cryptape/nervos.js.svg?branch=develop)](https://travis-ci.org/cryptape/nervos.js)
![](https://camo.githubusercontent.com/ecafd86d8356a1adc60fb4fd393bcc7584187f99/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6d61696e7461696e6564253230776974682d6c65726e612d6363303066662e737667)

# Overview

The `nervos.js` library is a collection of packages which contains specific functionality for the [Appchain](http://appchain.nervos.org/) ecosystem.

- The `nervos-chain` is for interacting with `Appchain` and has been published at [@nervos/chain](https://www.npmjs.com/package/@nervos/chain)
- The `nervos-signer` is for signing transaction for `Appchain` and has been published at [@nervos/signer](https://www.npmjs.com/package/@nervos/signer)

# Version

`@nervos/chain` strictly abides by Semver, and is compatible with [CITA](https://github.com/cryptape/cita) by `MAJOR` and `MINOR` version, e.g. `@nervos/chain@0.17.x` will work perfectly with `CITA@0.17`

# Getting Started

## `@nervos/chain`

To use `@nervos/chain', you can add it via npm

```shell
yarn add @nervos/chain
```

or to link it in browser directly with

```html
<script src="node_modules/@nervos/chain/lib/bundle.js" />
```

### Add `nervos.js`

```javascript
import Nervos from '@nervos/chain'
const nervos = Nervos('http://localhost:1337')
```

## `@nervos/signer`

To use `@nervos/signer', you can add it via npm

```shell
yarn add @nervos/signer
```

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
