[中文文档](https://github.com/citahub/cita-sdk-js/blob/develop/docs/zh-CN/cita-web-debugger.md)

# Overview

CITA Web Debugger is an extension of chrome similar to [MetaMask](https://metamask.io).

# Disclaimer

CITA Web Debugger is just a debugger tool now, do not take it as an official wallet.

# Quick Start

## Enable citaSDK in dapp to interact with CITA Web Debugger

```javascript
window.addEventListener('citaWebDebuggerReady', () => {
  window.console.log('cita web debugger ready')
  window.addMessenger(citaSDK)
})
```

## Get Default Account

```javascript
citaSDK.base.getDefaultAccount().then(defaultAccount => console.log(defaultAccount))
```

## Get Accounts

```javascript
citaSDK.base.getAccounts().then(accounts => console.log(accounts))
```

# Demos

Demos could be found at [DApp Demos](https://github.com/citahub/first-forever-demo/tree/neuron-web).

# Developer Mode

## Build for Developer Mode

```shell
yarn install && yarn run build
```

## Turn on Chrome Developer Mode

Go to `chrome://extensions` in chrome and turn on the switch of `Developer Mode`

## Add Develop Package of CITAWebDebugger

Click on <kbd>Load Unpacked Extension</kbd> to select the pre-built package `built` in `cita-web-debugger` for adding the develop package.
