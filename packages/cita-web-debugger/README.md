# Overview

Neuron Web is an extension of chrome similar to [MetaMask](https://metamask.io).

# Disclaimer

Neuron Web is just a debugger tool now, do not take it as an official wallet.

# Quick Start

## Enable nervos in dapp to interact with NeuronWeb

```javascript
window.addEventListener('neuronWebReady', () => {
  window.console.log('neuron web ready')
  window.addMessenger(nervos)
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

Demos could be found at [DApp Demos on Neuron-Web Branch](https://github.com/cryptape/dapp-demos/tree/neuron-web).

# Developer Mode

## Build for Developer Mode

```shell
yarn install && yarn run build
```

## Turn on Chrome Developer Mode

Go to `about://extension` in chrome and turn on the switch of `Developer Mode`

## Add Develop Package of NeuronWeb

Click on <kbd>Load Unpacked Extension</kbd> to select the pre-built package `built` in `neuronWeb` for adding the develop package.
