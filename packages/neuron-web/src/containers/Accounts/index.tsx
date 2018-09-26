import { Button, TextField } from '@material-ui/core'
import * as React from 'react'
import { pwd } from '../../config'
import { INervosContext, withNervos } from '../../contexts/nervos'
import { handleInputOf } from '../../utils/compActions'
import './accounts.css'

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
    const { accounts } = this.props.nervos.appchain
    if (!privateKey) {
      this.setState({
        privateKeyError: 'Please enter private key',
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
      chrome.runtime.sendMessage({
        action: 'privateKeyChanged',
      })
    } catch (err) {
      this.setState({
        privateKeyError: err.message,
      })
    }
  }
  public clearAccount = (e?: any) => {
    this.props.nervos.appchain.accounts.wallet.clear()
    this.props.nervos.appchain.accounts.wallet.save(pwd)
    this.setState({
      cleared: true,
      privateKey: '',
      privateKeyError: '',
    })
    chrome.runtime.sendMessage({
      action: 'privateKeyChanged',
    })
  }
  public render() {
    const { cleared, privateKey, privateKeyError } = this.state
    return (
      <div className="accounts__container">
        <h1 className="title-1">Private Key</h1>
        <TextField
          value={privateKey}
          error={!!privateKeyError}
          helperText={privateKeyError}
          onChange={this.handleInput('privateKey')}
          onKeyPress={this.handleKeyPress(EnterEventType.privateKey)}
          fullWidth={true}
        />
        <Button
          classes={{
            root: 'button-1 primary accounts__container--button',
          }}
          onClick={this.addAccount}
        >
          Enter
        </Button>
        <Button
          classes={{
            root: `button-1 ${cleared ? 'disabled' : 'primary'} accounts__container--button`,
          }}
          disabled={cleared}
          onClick={this.clearAccount}
        >
          {cleared ? 'Cleared' : 'Clear'}
        </Button>
      </div>
    )
  }
}
export default withNervos(Accounts)
