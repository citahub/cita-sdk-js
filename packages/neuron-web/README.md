# Overview

Neuron Web is an extension of chrome similar to [MetaMask](https://metamask.io).

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
nervos.appchain.getDefaultAccount().then(defaultAccount => console.log(defaultAccount))
```

## Get Accounts

```javascript
nervos.appchain.getAccounts().then(accounts => console.log(accounts))
```

# Demos

Demos could be found at [Dapp Demos on Neuron-Web Branch](https://github.com/cryptape/dapp-demos/tree/neuron-web).
