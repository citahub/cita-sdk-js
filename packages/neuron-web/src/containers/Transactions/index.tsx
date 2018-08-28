import { Button } from '@material-ui/core'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { INervosContext, withNervos } from '../../contexts/nervos'
import { copyToClipboard } from '../../utils/compActions'
import './transactions.css'

const SwitchWallet = () => (
  <Link to="/accounts">
    <Button classes={{ root: `button-1 primary transactions__list--button` }}>Switch Wallet</Button>
  </Link>
)

interface ITransaction {
  hash: string
  timestamp: number
}

const initState = {
  address: '',
  copied: false,
  error: '',
  limit: 10,
  transactions: [] as ITransaction[],
}
type ITransactionsState = typeof initState
class Transactions extends React.Component<INervosContext, ITransactionsState> {
  public readonly state = initState
  private timer: any
  public componentDidMount() {
    const { wallet } = this.props.nervos.appchain.accounts
    if (wallet.length) {
      this.setState({
        address: wallet[0].address,
      })
      this.loadTxs()
    }
  }
  public getSnapshotBeforeUpdate(prevProps: INervosContext) {
    if (prevProps.currentNumber < this.props.currentNumber) {
      this.loadTxs()
    }
    return null
  }
  public componentWillUnmount() {
    clearTimeout(this.timer)
  }

  public loadTxs = async () => {
    if (this.state.error) {
      return
    }
    const tx = await fetch(
      this.props.nervos.currentProvider.host +
        `/api/transactions?account${this.state.address}&limit=${this.state.limit}`,
    )
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

  public render() {
    const { address, transactions, copied } = this.state
    return (
      <div className="transactions__container">
        {address ? (
          <React.Fragment>
            <h1 className="title-1">Wallet Address</h1>
            <h2 className="subtitle-1">{address}</h2>
            <Button
              onClick={this.copyToClipboard}
              disabled={copied}
              classes={{ root: `button-1 ${copied ? 'disabled' : 'primary'} transactions__list--button` }}
            >
              {copied ? 'Copied' : 'Copy Address'}
            </Button>
            <SwitchWallet />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h1 className="title-1">No wallet yet, please import wallet first!</h1>
            <SwitchWallet />
          </React.Fragment>
        )}
        <div className="transactions__container--second">
          <h2>History Transactions</h2>
          <div className="transaction__list--board">
            {transactions.map(tx => (
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
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default withNervos(Transactions)
