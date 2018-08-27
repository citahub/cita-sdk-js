import { Button, Typography } from '@material-ui/core'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { INervosContext, withNervos } from '../../contexts/nervos'

const initState = {
  address: '',
  error: '',
  limit: 10,
  transactions: [] as any[],
}
type ITransactionsState = typeof initState
class Transactions extends React.Component<INervosContext, ITransactionsState> {
  public readonly state = initState
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
        window.alert(err)
      })
    window.console.log(tx.transactions[0])

    this.setState({
      ...tx,
    })
  }

  public render() {
    const { address } = this.state
    return (
      <div>
        {address ? (
          <React.Fragment>
            <Typography variant="display1">{address}</Typography>
            <Button>Copy</Button>
            <Link to="/accounts">
              <Button>Switch</Button>
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography variant="display1">No wallet yet, please import wallet first!</Typography>
            <Link to="/accounts">
              <Button>Import</Button>
            </Link>
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default withNervos(Transactions)
