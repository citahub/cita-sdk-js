[![Travis](https://travis-ci.org/citahub/cita-sdk-js.svg?branch=develop)](https://travis-ci.org/citahub/cita-sdk-js)
![](https://camo.githubusercontent.com/ecafd86d8356a1adc60fb4fd393bcc7584187f99/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6d61696e7461696e6564253230776974682d6c65726e612d6363303066662e737667)

# 概览

`cita-sdk-js` 是包含了多个应用于 CITA 生态圈的的包的项目.

- `@citahub/cita-sdk`, 发布于 [@citahub/cita-sdk](https://www.npmjs.com/package/@citahub/cita-sdk), 用于同 CITA 交互.

- `@citahub/cita-signer`, 发布于 [@citahub/cita-signer](https://www.npmjs.com/package/@citahub/cita-signer), 用于对发往 CITA 的交易进行签名.

# 版本

`@citahub/cita-sdk` 严格尊崇 Semver, 并且始终与 [CITA](https://github.com/citahub/cita) 的 `MAJOR` 和 `MINOR` 版本号保持一致.

# 需注意

Websocket 链接已支持, 但是 pub/sub 模式尚未在 CITA 上实现.


# 贡献

### 代码库
https://github.com/citahub/cita-sdk-js

### 技术栈

* Node: 9.4.0
* Language: TypeScript
* Library: Web3.js
* Dependency Manage: lerna、yarn


### 任务管理
https://github.com/citahub/cita-sdk-js/issues

### 代码编码规范
lint tool: ESLint
lint tool 相关配置文件在 /packages/cita-sdk/.eslintrc.js

### 代码提交规范
Github Flow Guide (https://guides.github.com/introduction/flow/)

### 版本号规则

`@citahub/cita-sdk` 严格尊崇 Semver, 并且始终与 [CITA](https://github.com/citahub/cita) 的 `MAJOR` 和 `MINOR` 版本号保持一致。

### 如何测试

**编译：**

```bash
$ git clone https://github.com/citahub/cita-sdk-js.git & cd ./cita-sdk-js
$ git submodule update --init --remote --recursive
$ yarn install
$ yarn bootstrap
$ yarn build 
```

**配置环境参数：**
找到 packages/cita-sdk 和 packages/cita-signer 下的 .env.example 文件，重命名为 .env，并修改文件中的配置。

**运行测试：**

```bash
$ yarn test
```

### 如何发布

```bash
$ npm login // 登录有发布权限的 npm 账号
$ lerna version [bump]
$ npm publish
```

版本升级不需要手动修改 package.json，在release修改的代码合并到master之后，由发布者使用 lerna version [bump] 升级版本并发布到npm。

### Push Tag

**命名规则：**

* cita-sdk
    * `@citahub/cita-sdk@x.y.z`
        * x.y 跟随 CITA 的版本号。
        * z 由 SDK 自己定义：修复或增加 feature 则变化。
* cita-signer
    * `@citahub/cita-signer@x.y.z`
        * x：主版本号，当功能模块有较大的变动。
        * y：子版本号，当功能有一定的增加或变化。
        * z：阶段版本号，一般是 Bug 修复或是一些小的变动。
* cita-web-debugger
    * `cita-web-debugger@x.y.z`
        * x：主版本号，当功能模块有较大的变动。
        * y：子版本号，当功能有一定的增加或变化。
        * z：阶段版本号，一般是 Bug 修复或是一些小的变动。


