[![Travis](https://travis-ci.org/citahub/cita-sdk-js.svg?branch=develop)](https://travis-ci.org/citahub/cita-sdk-js)
![](https://camo.githubusercontent.com/ecafd86d8356a1adc60fb4fd393bcc7584187f99/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6d61696e7461696e6564253230776974682d6c65726e612d6363303066662e737667)

[中文文档](https://github.com/citahub/cita-sdk-js/blob/develop/docs/zh-CN/overview.md)

# Overview

The `cita-sdk-js` library is a collection of packages which contains specific functionality for the [CITA](https://citahub.com/) ecosystem.

- The `@citahub/cita-sdk` is for interacting with `CITA` and has been published at [@citahub/cita-sdk](https://www.npmjs.com/package/@citahub/cita-sdk)
- The `@citahub/cita-signer` is for signing transaction for `CITA` and has been published at [@citahub/cita-signer](https://www.npmjs.com/package/@citahub/cita-signer)

# Version

`@citahub/cita-sdk` strictly abides by Semver, and is compatible with [CITA](https://github.com/citahub/cita) by `MAJOR` and `MINOR` version, e.g. `@citahub/cita-sdk@0.20.x` will work perfectly with `CITA@0.20`

# Notice

Websocket is supported, but the pub/sub is not completed in CITA for now.


# Contributing

### Repository
https://github.com/citahub/cita-sdk-js

### Tech Stack

* Node: 9.4.0
* Language: TypeScript
* Library: Web3.js
* Dependency Manage: lerna、yarn


### Task Management
https://github.com/citahub/cita-sdk-js/issues

### Coding Style
lint tool: ESLint
The lint tool related configuration file is in `/packages/cita-sdk/.eslintrc.js`.

### Commit Style
Github Flow Guide (https://guides.github.com/introduction/flow/)

### Version

`@citahub/cita-sdk` strictly abides by Semver, and is compatible with [CITA](https://github.com/citahub/cita) by `MAJOR` and `MINOR` version, e.g. `@citahub/cita-sdk@0.20.x` will work perfectly with `CITA@0.20`.

### How To Test

**Build:**

```bash
$ git clone https://github.com/citahub/cita-sdk-js.git & cd ./cita-sdk-js
$ git submodule update --init --remote --recursive
$ yarn install
$ yarn bootstrap
$ yarn build 
```

**Configure Environment:**

Find the `.env.example` file in the `packages/cita-sdk` and `packages/cita-signer` directories, rename it to `.env`, and modify the configuration in the file.

**Run Tests:**

```bash
$ yarn test
```

### How To Publish

```bash
$ npm login // Log in to the npm account with publishing permissions.
$ lerna version [bump]
$ npm publish
```

The version upgrade does not require manual modification of `package.json`. After the release modified code is merged into the master, the publisher uses `lerna version [bump]` to upgrade the version and publish it to npm.

### Push Tag

**Naming Rules:**

* cita-sdk
    * `@citahub/cita-sdk@x.y.z`
        * `x.y` follows the version number of CITA.
        * `z` is defined by the SDK itself, modified when adding or modifying a feature.
* cita-signer
    * `@citahub/cita-signer@x.y.z`
        * x: MAJOR version, when you make incompatible API changes.
        * y: MINOR version, when you add functionality in a backwards compatible manner.
        * z: STAGE version, when you make backwards compatible bug fixes.
* cita-web-debugger
    * `cita-web-debugger@x.y.z`
        * x: MAJOR version, when you make incompatible API changes.
        * y: MINOR version, when you add functionality in a backwards compatible manner.
        * z: STAGE version, when you make backwards compatible bug fixes.
