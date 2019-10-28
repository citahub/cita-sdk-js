# [v1.0.0](https://github.com/cryptape/cita-sdk-js/releases/tag/@cryptape/cita-sdk@1.0.0) (2019-10-28)


### Bug Fixes

* fix bug of pass private key without 0x to nervos.appchain.accounts.privateKeyToAccount ([2d5d545](https://github.com/cryptape/cita-sdk-js/commit/2d5d545df12aa229e04b4a6daf75b8a3eb903e90))
* fix chain manage contract address ([12b4558](https://github.com/cryptape/cita-sdk-js/commit/12b4558dbc6ead33f59f777cf1312ca50a8df43d))
* fix hex to bytes ([2c0fb1b](https://github.com/cryptape/cita-sdk-js/commit/2c0fb1b9f546f2f26055d7b1856c0a99f45f96f3))
* fix neuron web address error text ([c1cb96d](https://github.com/cryptape/cita-sdk-js/commit/c1cb96dc181b0b5a53c282b4e39cc6c8b79d75d0))
* fix quota in test ([e328ef8](https://github.com/cryptape/cita-sdk-js/commit/e328ef8c669552c029dc814bcde59e303a0785b6))
* fix setProvider ([f093aa9](https://github.com/cryptape/cita-sdk-js/commit/f093aa999b2fbda1d2045978feee27a3ebaab8c5))
* fix sign flow ([9405148](https://github.com/cryptape/cita-sdk-js/commit/9405148462331cf8efb21de7f7f6c3c3202e6724))
* fix test for 0.17 fix ([097b823](https://github.com/cryptape/cita-sdk-js/commit/097b82368f71de2fab08427ad7c191877927f4f7))
* fix travis cache ([75b3068](https://github.com/cryptape/cita-sdk-js/commit/75b3068fc9257fad557dd39a63b16e3203f3ee03))
* fix typo ([7f47358](https://github.com/cryptape/cita-sdk-js/commit/7f47358346e0d26625a530122a72592ae9e65e3c))
* **contract:** update contract subscription methods ([a9d5939](https://github.com/cryptape/cita-sdk-js/commit/a9d59390c3f2ca430c86b268325091411c489ffc))
* **signer:** padding result of bytes2hex with 0 ([d58286b](https://github.com/cryptape/cita-sdk-js/commit/d58286b2f10417089bf5b2a806a2ee64354c0034))
* fix typo in listeners ([cfbc2f2](https://github.com/cryptape/cita-sdk-js/commit/cfbc2f215dac35f6cc2cc8c9298dc0417e8d6f7a))
* ignore event signature in getLogs method ([e0eef49](https://github.com/cryptape/cita-sdk-js/commit/e0eef499bb7b73032f9616b4d830f1667c44ce08))
* remove console ([875ac8a](https://github.com/cryptape/cita-sdk-js/commit/875ac8a045b6d7613ac5a36aa883782d4219e92f))
* remove package lock ([9fb5a5e](https://github.com/cryptape/cita-sdk-js/commit/9fb5a5e8c2bec9d374fa4a0f3c31e8bc39989a01))
* remove package lock in cita-web-debugger ([02cf4db](https://github.com/cryptape/cita-sdk-js/commit/02cf4dbe7d76a1c97d6d3b2254913ea84b43b657))
* update test cases ([0e28e78](https://github.com/cryptape/cita-sdk-js/commit/0e28e786ee96aa53ab366fdc9a56c3f4211cd3b4))


### Features

* add log on debugger ready ([a82ec1d](https://github.com/cryptape/cita-sdk-js/commit/a82ec1d4ffab37a47bde361b2b8f21fea2477d3a))
* update web3 deps ([b4f6460](https://github.com/cryptape/cita-sdk-js/commit/b4f6460ad9b1d527ea5f420c551ada0414039341))
* **rpc:** add two rpc methods ([0aa093e](https://github.com/cryptape/cita-sdk-js/commit/0aa093e2228a88b84524bc62d131228a67cd3dbe))
* **signer:** support cita v2 ([1dfae4d](https://github.com/cryptape/cita-sdk-js/commit/1dfae4d6929508966ced54fcb2d5762ac75b63dd))
* **signer:** update cita-proto ([5ac68dc](https://github.com/cryptape/cita-sdk-js/commit/5ac68dc3f5c4b6842894aea0e54ff7b3750e75ae))


### Performance Improvements

* update neuron-web start time ([8b42137](https://github.com/cryptape/cita-sdk-js/commit/8b421373ef2afe5bd0bb44d52881fbfde27cd04d))



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
