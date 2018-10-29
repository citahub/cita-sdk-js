[![Travis](https://travis-ci.org/cryptape/nervos.js.svg?branch=develop)](https://travis-ci.org/cryptape/nervos.js)
![](https://camo.githubusercontent.com/ecafd86d8356a1adc60fb4fd393bcc7584187f99/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6d61696e7461696e6564253230776974682d6c65726e612d6363303066662e737667)
[![AppChain](https://img.shields.io/badge/made%20for-Nervos%20AppChain-blue.svg)](https://appchain.nervos.org)

# Overview

The `nervos.js` library is a collection of packages which contains specific functionality for the [Nervos AppChain](http://appchain.nervos.org/) ecosystem.

- The `nervos-chain` is for interacting with `AppChain` and has been published at [@appchain/base](https://www.npmjs.com/package/@appchain/base)
- The `nervos-signer` is for signing transaction for `AppChain` and has been published at [@appchain/signer](https://www.npmjs.com/package/@appchain/signer)

# Version

`@appchain/base` strictly abides by Semver, and is compatible with [CITA](https://github.com/cryptape/cita) by `MAJOR` and `MINOR` version, e.g. `@appchain/base@0.17.x` will work perfectly with `CITA@0.17`

# Changelog since @appchain/base@0.18.0

- [update]: **System Contracts**, add 7 more system contracts instance.
- [fix]: **Account Generation**, fix bug of pass privatekey without `0x` to nervos.appchain.accounts.privateKeyToAccount;
