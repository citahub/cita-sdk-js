# 概述

CITA Web Debugger 是一款与 [MetaMask](https://metamask.io) 类似的 Chrome 插件.

# 免责声明

CITA Web Debugger 仅作为 Debug 工具, 请不要将他视为钱包.

# 快速开始

## 连接 citaSDK 与 CITA Web Debugger

```javascript
window.addEventListener('citaWebDebuggerReady', () => {
  window.console.log('cita web debugger ready')
  window.addMessenger(citaSDK)
})
```

## 获取默认账户

```javascript
citaSDK.base.getDefaultAccount().then(defaultAccount => console.log(defaultAccount))
```

## 获取所有账户

```javascript
citaSDK.base.getAccounts().then(accounts => console.log(accounts))
```

# Demos

[DApp Demos](https://github.com/cryptape/first-forever-demo/tree/neuron-web).

# 开发者模式

## 构建开发者版本

```shell
yarn install && yarn run build
```

## 开启 Chrome 的开发者模式

在 Chrome 中前往 `about://extension` 并开启 `Developer Mode`

## 添加开发者版本的安装包

点击 <kbd>Load Unpacked Extension</kbd> 并选中 `cita-web-debugger` 中的 `buid` 目录以添加插件只 Chrome.
