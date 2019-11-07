# [v1.0.1](https://github.com/cryptape/cita-sdk-js/releases/tag/@cryptape/cita-sdk@1.0.1)

### Changed
bump version for early withdrawn the cita-sdk v1.0.0,  can't release the v1.0.0 to npmjs.com any more. 

# [v1.0.0](https://github.com/cryptape/cita-sdk-js/releases/tag/@cryptape/cita-sdk@1.0.0)

### Features
* support SM2 signature and SM3 hash ([a94cd999](https://github.com/cryptape/cita-sdk-js/pull/222))


# [v0.25.0](https://github.com/cryptape/cita-sdk-js/releases/tag/@cryptape/cita-sdk@0.25.0) ([compare](https://github.com/cryptape/cita-sdk-js/compare/@cryptape/cita-sdk@0.24.1...@cryptape/cita-sdk@0.25.0))

### Changed

* Dependabot upgraded some dependencie ([fbca58a...04cf0d6](https://github.com/cryptape/cita-sdk-js/compare/fbca58a...72c0176) by Keith-CY).
* Upgrade fstream to 1.0.12 ([80c1de9](https://github.com/cryptape/cita-sdk-js/pull/202/commits/80c1de925c2fb3f4d5b66a4145c818dc66da7a41) by cezres).
* Removed dependency protoc ([50146e1](https://github.com/cryptape/cita-sdk-js/pull/202/commits/50146e1eee19a78f4cb1c644b9179710e73ff500) by cezres).

### Fixed

* Fixed an issue where cita-web-debugger build failed ([d2264dc](https://github.com/cryptape/cita-sdk-js/pull/202/commits/d2264dcef5589ea07a6f107734d4ef60e2ac5aa2) by cezres)



#  (2019-04-20)


### Bug Fixes

* **contract:** update contract subscription methods ([a9d5939](https://github.com/cryptape/cita-sdk-js/commit/a9d5939))
* remove package lock in cita-web-debugger ([02cf4db](https://github.com/cryptape/cita-sdk-js/commit/02cf4db))


### Features

* **rpc:** add two rpc methods ([0aa093e](https://github.com/cryptape/cita-sdk-js/commit/0aa093e))



#  (2019-03-28)


### Bug Fixes

* remove package lock in cita-web-debugger ([02cf4db](https://github.com/cryptape/cita-sdk-js/commit/02cf4db))
* **signer:** padding result of bytes2hex with 0 ([d58286b](https://github.com/cryptape/cita-sdk-js/commit/d58286b))
* fix bug of pass private key without 0x to nervos.appchain.accounts.privateKeyToAccount ([2d5d545](https://github.com/cryptape/cita-sdk-js/commit/2d5d545))
* fix chain manage contract address ([12b4558](https://github.com/cryptape/cita-sdk-js/commit/12b4558))
* fix hex to bytes ([2c0fb1b](https://github.com/cryptape/cita-sdk-js/commit/2c0fb1b))
* fix neuron web address error text ([c1cb96d](https://github.com/cryptape/cita-sdk-js/commit/c1cb96d))
* fix quota in test ([e328ef8](https://github.com/cryptape/cita-sdk-js/commit/e328ef8))
* fix setProvider ([f093aa9](https://github.com/cryptape/cita-sdk-js/commit/f093aa9))
* fix sign flow ([9405148](https://github.com/cryptape/cita-sdk-js/commit/9405148))
* fix test for 0.17 fix ([097b823](https://github.com/cryptape/cita-sdk-js/commit/097b823))
* fix travis cache ([75b3068](https://github.com/cryptape/cita-sdk-js/commit/75b3068))
* fix typo ([7f47358](https://github.com/cryptape/cita-sdk-js/commit/7f47358))
* fix typo in listeners ([cfbc2f2](https://github.com/cryptape/cita-sdk-js/commit/cfbc2f2))
* remove console ([875ac8a](https://github.com/cryptape/cita-sdk-js/commit/875ac8a))
* remove package lock ([9fb5a5e](https://github.com/cryptape/cita-sdk-js/commit/9fb5a5e))
* update test cases ([0e28e78](https://github.com/cryptape/cita-sdk-js/commit/0e28e78))


### Features

* **signer:** update cita-proto ([5ac68dc](https://github.com/cryptape/cita-sdk-js/commit/5ac68dc))
* add log on debugger ready ([a82ec1d](https://github.com/cryptape/cita-sdk-js/commit/a82ec1d))
* update web3 deps ([b4f6460](https://github.com/cryptape/cita-sdk-js/commit/b4f6460))


### Performance Improvements

* update neuron-web start time ([8b42137](https://github.com/cryptape/cita-sdk-js/commit/8b42137))



#  (2019-03-20)


### Bug Fixes

* remove package lock in cita-web-debugger ([02cf4db](https://github.com/cryptape/cita-sdk-js/commit/02cf4db))
* **signer:** padding result of bytes2hex with 0 ([d58286b](https://github.com/cryptape/cita-sdk-js/commit/d58286b))
* fix bug of pass private key without 0x to nervos.appchain.accounts.privateKeyToAccount ([2d5d545](https://github.com/cryptape/cita-sdk-js/commit/2d5d545))
* fix chain manage contract address ([12b4558](https://github.com/cryptape/cita-sdk-js/commit/12b4558))
* fix hex to bytes ([2c0fb1b](https://github.com/cryptape/cita-sdk-js/commit/2c0fb1b))
* fix neuron web address error text ([c1cb96d](https://github.com/cryptape/cita-sdk-js/commit/c1cb96d))
* fix quota in test ([e328ef8](https://github.com/cryptape/cita-sdk-js/commit/e328ef8))
* fix setProvider ([f093aa9](https://github.com/cryptape/cita-sdk-js/commit/f093aa9))
* fix sign flow ([9405148](https://github.com/cryptape/cita-sdk-js/commit/9405148))
* fix test for 0.17 fix ([097b823](https://github.com/cryptape/cita-sdk-js/commit/097b823))
* fix travis cache ([75b3068](https://github.com/cryptape/cita-sdk-js/commit/75b3068))
* fix typo ([7f47358](https://github.com/cryptape/cita-sdk-js/commit/7f47358))
* fix typo in listeners ([cfbc2f2](https://github.com/cryptape/cita-sdk-js/commit/cfbc2f2))
* remove console ([875ac8a](https://github.com/cryptape/cita-sdk-js/commit/875ac8a))
* remove package lock ([9fb5a5e](https://github.com/cryptape/cita-sdk-js/commit/9fb5a5e))
* update test cases ([0e28e78](https://github.com/cryptape/cita-sdk-js/commit/0e28e78))


### Features

* **signer:** update cita-proto ([5ac68dc](https://github.com/cryptape/cita-sdk-js/commit/5ac68dc))
* add log on debugger ready ([a82ec1d](https://github.com/cryptape/cita-sdk-js/commit/a82ec1d))
* update web3 deps ([b4f6460](https://github.com/cryptape/cita-sdk-js/commit/b4f6460))


### Performance Improvements

* update neuron-web start time ([8b42137](https://github.com/cryptape/cita-sdk-js/commit/8b42137))



# (2019-02-13)

### Bug Fixes

- **signer:** padding result of bytes2hex with 0 ([d58286b](https://github.com/cryptape/cita-sdk-js/commit/d58286b))

### Features

- **signer:** update cita-proto ([5ac68dc](https://github.com/cryptape/cita-sdk-js/commit/5ac68dc))

# (2019-01-16)

### Bug Fixes

- fix bug of pass private key without 0x to nervos.appchain.accounts.privateKeyToAccount ([2d5d545](https://github.com/cryptape/cita-sdk-js/commit/2d5d545))
- fix chain manage contract address ([12b4558](https://github.com/cryptape/cita-sdk-js/commit/12b4558))
- fix hex to bytes ([2c0fb1b](https://github.com/cryptape/cita-sdk-js/commit/2c0fb1b))
- fix neuron web address error text ([c1cb96d](https://github.com/cryptape/cita-sdk-js/commit/c1cb96d))
- fix quota in test ([e328ef8](https://github.com/cryptape/cita-sdk-js/commit/e328ef8))
- fix setProvider ([f093aa9](https://github.com/cryptape/cita-sdk-js/commit/f093aa9))
- fix sign flow ([9405148](https://github.com/cryptape/cita-sdk-js/commit/9405148))
- fix test for 0.17 fix ([097b823](https://github.com/cryptape/cita-sdk-js/commit/097b823))
- fix travis cache ([75b3068](https://github.com/cryptape/cita-sdk-js/commit/75b3068))
- fix typo ([7f47358](https://github.com/cryptape/cita-sdk-js/commit/7f47358))
- fix typo in listeners ([cfbc2f2](https://github.com/cryptape/cita-sdk-js/commit/cfbc2f2))
- remove console ([875ac8a](https://github.com/cryptape/cita-sdk-js/commit/875ac8a))
- remove package lock ([9fb5a5e](https://github.com/cryptape/cita-sdk-js/commit/9fb5a5e))
- update test cases ([0e28e78](https://github.com/cryptape/cita-sdk-js/commit/0e28e78))

### Features

- add log on debugger ready ([a82ec1d](https://github.com/cryptape/cita-sdk-js/commit/a82ec1d))
- update web3 deps ([b4f6460](https://github.com/cryptape/cita-sdk-js/commit/b4f6460))

### Performance Improvements

- update neuron-web start time ([8b42137](https://github.com/cryptape/cita-sdk-js/commit/8b42137))
