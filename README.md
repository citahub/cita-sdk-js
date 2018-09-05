[![Travis](https://travis-ci.org/cryptape/nervos.js.svg?branch=develop)](https://travis-ci.org/cryptape/nervos.js)
![](https://camo.githubusercontent.com/ecafd86d8356a1adc60fb4fd393bcc7584187f99/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6d61696e7461696e6564253230776974682d6c65726e612d6363303066662e737667)
[![AppChain](https://img.shields.io/badge/made%20for-Nervos%20AppChain-blue.svg)](https://appchain.nervos.org)

# Overview

The `nervos.js` library is a collection of packages which contains specific functionality for the [Nervos Appchain](http://appchain.nervos.org/) ecosystem.

- The `nervos-chain` is for interacting with `Appchain` and has been published at [@nervos/chain](https://www.npmjs.com/package/@nervos/chain)
- The `nervos-signer` is for signing transaction for `Appchain` and has been published at [@nervos/signer](https://www.npmjs.com/package/@nervos/signer)

# Version

`@nervos/chain` strictly abides by Semver, and is compatible with [CITA](https://github.com/cryptape/cita) by `MAJOR` and `MINOR` version, e.g. `@nervos/chain@0.17.x` will work perfectly with `CITA@0.17`

# Changelog after @nervos/chain@0.17.5

[fix]: **utils.hexToBytes**, and error of original web3@1.0.0;
[fix]: **setProvider**, enable `nervos.setProvider` function;
[update]: **UMD Object**, update UMD Object to `window.Nervos`;
[fix]: **Chain Manage**, fix chainManage Contract address;
[update]: **Return From**, parameter `from` will be included to return when sendTransaction has no private key;
[update]: **Lower Address**, lower `to` address in transaction when sendTransaction;
