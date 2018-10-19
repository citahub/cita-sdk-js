import {
  Button,
  // TextField
} from '@material-ui/core'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import * as React from 'react'
import CusTextField from '../../components/CusTextField'

import { pwd } from '../../config'
import { INervosContext, withNervos } from '../../contexts/nervos'
import { handleInputOf } from '../../utils/compActions'
import './accounts.css'

const ErrorMessage = 'Private Key Error...'

enum EnterEventType {
  privateKey = 'PRIVATE_KEY',
  login = 'LOGIN',
}
const initState = {
  cleared: false,
  loaded: false,
  privateKey: '',
  privateKeyError: '',
}

type IAccounts = typeof initState
class Accounts extends React.Component<INervosContext & any, IAccounts> {
  public readonly state = initState

  public handleInput = handleInputOf(this)
  public componentDidMount() {
    this.loadWallet()
  }
  public loadWallet = () => {
    // const wallet = this.props.nervos.appchain.accounts.wallet.load(pwd)
    const { wallet } = this.props.nervos.appchain.accounts
    if (wallet.length) {
      this.setState({
        loaded: true,
        privateKey: wallet[0].privateKey,
      })
    }
  }
  public handleKeyPress = (type: string) => (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      if (type === EnterEventType.privateKey) {
        this.addAccount()
        e.preventDefault()
      }
    }
  }
  public addAccount = (e?: any) => {
    const { privateKey } = this.state
    if (!privateKey) {
      return this.clearAccount()
    }
    const { accounts } = this.props.nervos.appchain
    if (privateKey.replace(/^0x/, '').length !== 64) {
      this.setState({
        privateKeyError: 'Please enter private key in valid format',
      })
      return
    }
    if (accounts.wallet[0] && accounts.wallet[0].privateKey === privateKey) {
      return this.props.history.push('/transactions')
    }
    try {
      accounts.wallet.clear()
      const account = accounts.privateKeyToAccount(privateKey)
      accounts.wallet.add(account)
      accounts.wallet.save(pwd)
      this.props.history.push('/transactions')
      if (chrome && chrome.runtime) {
        chrome.runtime.sendMessage({
          action: 'privateKeyChanged',
        })
      }
    } catch (err) {
      this.setState({
        privateKeyError: err.message,
      })
    }
  }
  public clearText = (e?: any) => {
    this.setState({
      privateKey: '',
      privateKeyError: '',
    })
  }
  public clearAccount = (e?: any) => {
    this.props.nervos.appchain.accounts.wallet.clear()
    this.props.nervos.appchain.accounts.wallet.save(pwd)
    this.setState({
      cleared: true,
      privateKey: '',
      privateKeyError: '',
    })
    if (chrome && chrome.runtime) {
      chrome.runtime.sendMessage({
        action: 'privateKeyChanged',
      })
    }
  }
  public goBack = (e?: any) => {
    this.props.history.goBack()
  }
  public render() {
    const {
      // cleared,
      privateKey,
      privateKeyError,
    } = this.state
    return (
      <div className="accounts__container">
        <div className="header">
          <ArrowBackIos onClick={this.goBack} style={{ cursor: 'pointer' }} />
        </div>
        <h1 className="title-1">Private Key</h1>
        {/*
        <TextField
          value={privateKey}
          error={!!privateKeyError}
          helperText={privateKeyError ? ErrorMessage : ''}
          onChange={this.handleInput('privateKey')}
          onKeyPress={this.handleKeyPress(EnterEventType.privateKey)}
          fullWidth={true}
        />
        */}
        <CusTextField
          value={privateKey}
          onChange={this.handleInput('privateKey')}
          onClear={this.clearText}
          onKeyPress={this.handleKeyPress(EnterEventType.privateKey)}
          error={!!privateKeyError}
          helperText={privateKeyError ? ErrorMessage : ''}
          style={{
            margin: '0 auto',
            maxWidth: '474px',
          }}
        />
        <Button
          classes={{
            root: 'button-1 primary accounts__container--button',
          }}
          onClick={this.addAccount}
        >
          Enter
        </Button>
        {/*
        <Button
          classes={{
            root: `button-1 ${cleared ? 'disabled' : 'primary'} accounts__container--button`,
          }}
          disabled={cleared}
          onClick={this.clearAccount}
        >
          {cleared ? 'Cleared' : 'Clear'}
        </Button>
        */}
      </div>
    )
  }
}
export default withNervos(Accounts)
