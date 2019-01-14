[![Travis](https://travis-ci.org/cryptape/cita-sdk-js.svg?branch=develop)](https://travis-ci.org/cryptape/cita-sdk-js)
![](https://camo.githubusercontent.com/ecafd86d8356a1adc60fb4fd393bcc7584187f99/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6d61696e7461696e6564253230776974682d6c65726e612d6363303066662e737667)
[![AppChain](https://img.shields.io/badge/made%20for-Nervos%20AppChain-blue.svg)](https://appchain.nervos.org)

# Overview

The `appchain.js` library is a collection of packages which contains specific functionality for the [Nervos AppChain](http://appchain.nervos.org/) ecosystem.

- The `appchain-base` is for interacting with `AppChain` and has been published at [@appchain/base](https://www.npmjs.com/package/@appchain/base)
- The `appchain-signer` is for signing transaction for `AppChain` and has been published at [@appchain/signer](https://www.npmjs.com/package/@appchain/signer)

# Version

`@appchain/base` strictly abides by Semver, and is compatible with [CITA](https://github.com/cryptape/cita) by `MAJOR` and `MINOR` version, e.g. `@appchain/base@0.17.x` will work perfectly with `CITA@0.17`

# Changlog since @appchain/base@0.19.0
  - [Chore]: *test*, add appchain-tests module;
  - [Fix]: *signature*, fix signature offset;
  - [Update]: *type-def*, update web3 type definition;
  - [Feature]: *protocol version*, support CITA version 1;
  - [Refactor]: *store-abi*, refactor storeAbi method;
  - [Feature]: *getTransaction*, add more detail in result of getTransaction;
  - [Update]: *Rename*, rename @nervos/chain to @appchain/base
