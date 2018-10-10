import {
  Button,
  // IconButton
} from '@material-ui/core'
// import SettingsIcon from '@material-ui/icons/Settings'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { INervosContext, withNervos } from '../../contexts/nervos'
import { IUniComp } from '../../hoc/UniComp'
import { copyToClipboard } from '../../utils/compActions'
import './transactions.css'

const rebirth = window.localStorage.getItem('rebirth') || 'https://microscope.cryptape.com:8888'
const RATIO = 1e9

const SwitchWallet = ({ address }: { address: string }) => (
  <Link to="/accounts">
    <Button classes={{ root: `button-1 primary transactions__list--button` }}>
      {address ? `Switch Wallet` : `Import Wallet`}
    </Button>
  </Link>
)

interface ITransaction {
  hash: string
  timestamp: number
}

const initState = {
  address: '',
  balance: '',
  copied: false,
  error: '',
  limit: 10,
  metadata: {
    chainName: '',
    tokenSymbol: '',
  },
  transactions: [] as ITransaction[],
}
type ITransactionsState = typeof initState
class Transactions extends React.Component<INervosContext & IUniComp, ITransactionsState> {
  public readonly state = initState
  private timer: any
  public componentDidMount() {
    const { wallet } = this.props.nervos.appchain.accounts
    if (wallet.length) {
      this.setState({
        address: wallet[0].address,
      })
      this.getBalance(wallet[0].address)
      // this.loadTxs()
    }
    this.getMetaData()
  }
  public getBalance = (address: string) => {
    this.props.nervos.appchain
      .getBalance(address)
      .then((balance: string) => {
        this.setState({ balance })
      })
      .catch(window.console.warn)
  }
  public getMetaData = () => {
    this.props.nervos.appchain
      .getMetaData()
      .then((metadata: typeof initState.metadata) => {
        this.setState({ metadata })
      })
      .catch(window.console.warn)
  }
  public componentDidUpdate(nextProps: INervosContext & IUniComp, prevState: ITransactionsState, snapshot: boolean) {
    if (snapshot) {
      this.loadTxs()
    }
  }
  public getSnapshotBeforeUpdate(prevProps: INervosContext) {
    const { wallet } = this.props.nervos.appchain.accounts
    if (prevProps.currentNumber < this.props.currentNumber && wallet.length) {
      return true
    }
    return false
  }

  public componentWillUnmount() {
    clearTimeout(this.timer)
  }

  public loadTxs = async () => {
    if (this.state.error && !this.state.address) {
      return
    }
    const tx = await fetch(rebirth + `/api/transactions?account=${this.state.address}&limit=${this.state.limit}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(res.statusText)
        } else {
          return res.json()
        }
      })
      .then(res => res.result)
      .catch(err => {
        this.setState({ error: err })
      })

    this.setState({
      ...tx,
    })
  }
  public copyToClipboard = (e: any) => {
    if (!this.state.copied) {
      if (copyToClipboard(this.state.address)) {
        this.setState({ copied: true })
        this.timer = setTimeout(() => {
          this.setState({ copied: false })
        }, 3000)
      }
    }
  }

  public editTransaction = (e: any) => {
    this.props.setTransaction()
    this.props.setDialogue(true)
  }

  public editEncryptedMessage = (e: any) => {
    this.props.setEncryptedMessage(e.currentTarget.value)
    this.props.setDialogue(true)
  }
  public render() {
    const { address, transactions, copied, metadata, balance } = this.state
    return (
      <div className="transactions__container">
        <div className="header" style={{ borderBottom: '1px solid #e9ebf0' }}>
          <img className="logo" src="https://cdn.cryptape.com/images/neuron-logo.png" alt="logo" />
          <div className="transactions__network">
            Current Network: <Link to="/options" style={{ color: 'inherit' }}>{`${metadata.chainName}`}</Link>
          </div>
        </div>
        {address ? (
          <React.Fragment>
            <h1 className="title-1">Wallet Address</h1>
            <h2 className="subtitle-1">{address}</h2>
            <h1 className="title-1">Balance</h1>
            <h2 className="subtitle-1">
              {+balance / RATIO} {metadata.tokenSymbol}
            </h2>
            <Button
              onClick={this.copyToClipboard}
              disabled={copied}
              classes={{ root: `button-1 ${copied ? 'disabled' : 'primary'} transactions__list--button` }}
            >
              {copied ? 'Copied' : 'Copy Address'}
            </Button>
            <SwitchWallet address={address} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h1
              className="title-1"
              style={{
                color: '#2e313e',
                fontFamily: 'PingFangSC',
                fontSize: '22px',
                lineHeight: 1.23,
                marginBottom: '39px',
                marginTop: '70px',
              }}
            >
              No wallet yet, please import wallet first!
            </h1>
            <SwitchWallet address={address} />
          </React.Fragment>
        )}
        <div className="transactions__container--second">
          <h2
            style={{
              color: '#6c7184',
              fontSize: '0.875rem',
              fontWeight: 100,
              padding: '0 17px',
              textAlign: 'left',
            }}
          >
            <React.Fragment>
              {transactions.length ? 'History Transactions' : 'No Transactions'}{' '}
              {/*
              <Link to="/options">
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </Link>
              */}
            </React.Fragment>
          </h2>
          <div className="transaction__list--board">
            {this.props.currentTxHash ? (
              <div className="transaction__list--item">
                <div className="transactions__list--time">
                  {/*
                  Listening to
                */}
                  '****/**/** **:**:**'
                </div>
                <div className="transactions__list--hash">{this.props.currentTxHash}</div>
              </div>
            ) : null}
            {transactions.length
              ? transactions.map(tx => (
                  <div className="transactions__list--item" key={tx.hash}>
                    <div className="transactions__list--time">{new Date(tx.timestamp).toLocaleString()}</div>
                    <div className="transactions__list--hash" title={tx.hash}>
                      <a
                        href={`${process.env.REACT_APP_MICROSCOPE}#/transaction/${tx.hash}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {tx.hash}
                      </a>
                    </div>
                  </div>
                ))
              : 'No Transactions'}
          </div>
        </div>
        {/*
        <div
          className="transaction__container--third"
          style={{
            display: 'none',
          }}
        >
          <h1 className="title-1">DApp Test</h1>
          <Button onClick={this.editTransaction} classes={{ root: 'button-1 primary transaction__button--submit' }}>
            Send Transaction
          </Button>
          <Button
            onClick={this.editEncryptedMessage}
            classes={{ root: 'button-1 primary transaction__button--submit' }}
          >
            Sign
          </Button>
        </div>
          */}
      </div>
    )
  }
}

export default withNervos(Transactions)
