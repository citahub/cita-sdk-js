import { Button, TextField, Typography } from '@material-ui/core'
import * as React from 'react'
import { pwd } from '../../config'
import { INervosContext, withNervos } from '../../contexts/nervos'
import { handleInputOf } from '../../utils/compActions'

enum EnterEventType {
  privateKey = 'PRIVATE_KEY',
  login = 'LOGIN',
}
const initState = {
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
      this.setState({
        privateKeyError: 'Please enter private key',
      })
      return
    }
    try {
      this.props.nervos.appchain.accounts.wallet.clear()
      const account = this.props.nervos.appchain.accounts.privateKeyToAccount(privateKey)
      this.props.nervos.appchain.accounts.wallet.add(account)
      this.props.nervos.appchain.accounts.wallet.save(pwd)
      this.props.history.push('/transactions')
      // this.setState({ loaded: true })
    } catch (err) {
      this.setState({
        privateKeyError: err.message,
      })
    }
  }
  public render() {
    const { privateKey, privateKeyError } = this.state
    return (
      <div>
        <Typography variant="display1" align="center" title="Private Key">
          Private Key
        </Typography>
        <TextField
          value={privateKey}
          error={!!privateKeyError}
          helperText={privateKeyError}
          onChange={this.handleInput('privateKey')}
          onKeyPress={this.handleKeyPress(EnterEventType.privateKey)}
          fullWidth={true}
        />
        <Button onClick={this.addAccount}>Enter</Button>
      </div>
    )
  }
}
export default withNervos(Accounts)
