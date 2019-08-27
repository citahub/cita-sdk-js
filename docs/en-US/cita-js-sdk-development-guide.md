## CITA JS SDK Development Guide

### Repository
https://github.com/cryptape/cita-sdk-js

### Tech Stack

* Node: 9.4.0
* Language: TypeScript
* Library: Web3.js
* Dependency Manage: lerna、yarn


### Task Management
https://github.com/cryptape/cita-sdk-js/issues

### Coding Style
lint tool: ESLint
The lint tool related configuration file is in `/packages/cita-sdk/.eslintrc.js`.

### Commit Style
Github Flow Guide (https://guides.github.com/introduction/flow/)

### Version

`@cryptape/cita-sdk` strictly abides by Semver, and is compatible with [CITA](https://github.com/cryptape/cita) by `MAJOR` and `MINOR` version, e.g. `@cryptape/cita-sdk@0.20.x` will work perfectly with `CITA@0.20`.

### How To Test

**Build:**

```bash
$ git clone https://github.com/cryptape/cita-sdk-js.git & cd ./cita-sdk-js
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
    * `@cryptape/cita-sdk@x.y.z`
        * `x.y` follows the version number of CITA.
        * `z` is defined by the SDK itself, modified when adding or modifying a feature.
* cita-signer
    * `@cryptape/cita-signer@x.y.z`
        * x: MAJOR version, when you make incompatible API changes.
        * y: MINOR version, when you add functionality in a backwards compatible manner.
        * z: STAGE version, when you make backwards compatible bug fixes.
* cita-web-debugger
    * `cita-web-debugger@x.y.z`
        * x: MAJOR version, when you make incompatible API changes.
        * y: MINOR version, when you add functionality in a backwards compatible manner.
        * z: STAGE version, when you make backwards compatible bug fixes.
