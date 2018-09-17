import * as React from 'react'
import Dialogue from '../components/Dialogue'
import Notifier, { NotifierType } from '../components/Notifier'
import Transaction, { tx } from '../components/Transaction'
import { INervosContext, withNervos } from '../contexts/nervos'
// import { sendMessageToContentScript, sendMessageToRuntime } from '../utils/extensions'
// import { handleInputOf } from '../utils/compActions'
import './brand.css'

export interface IUniComp {
  currentTxHash: string
  handleError: (errorMsg: string) => void
  setDialogue: (dialogueOn?: boolean) => void
  setTransaction: (transaction?: typeof tx) => void
  // handleUniInput: (key: string) => (e?: any) => void
}

export enum TransactionAction {
  NONE,
  REJECT,
  SUBMIT,
  SENDING,
}

const initState = {
  appId: 0,
  currentTxHash: '',
  dappId: 0,
  dialogueOn: false,
  errorMsg: '',
  transaction: tx,
  txStatus: TransactionAction.NONE,
}

/**
 * @param Comp
 * Add brand, error handler, transaction dialog
 */
const UniComp = (Comp: typeof React.Component) => {
  class WithUniComp extends React.Component<INervosContext, typeof initState> {
    public readonly state = initState
    public componentDidMount() {
      chrome.runtime.onMessage.addListener((message, sender, res) => {
        const { action, data } = message
        if (action === 'confirm') {
          this.setState({
            appId: data.appId,
            dappId: data.dappId,
            dialogueOn: true,
            transaction: data.transaction,
          })
        }
      })
    }

    public handleError = (errorMsg: string) => {
      this.setState({
        errorMsg,
      })
    }
    public handleTxEdit = (key: string, v?: string | number) => (e?: any) => {
      const { value } = e.currentTarget as any
      this.setState((state: typeof initState) => {
        const localTx = { ...state.transaction }
        localTx[key] = value || v
        return {
          transaction: localTx,
        }
      })
    }
    public setDialogue = (dialogueOn: boolean = false) => {
      if (dialogueOn && !this.state.transaction.validUntilBlock) {
        this.setState((state: any) => {
          const localTx = { ...state.transaction, validUntilBlock: this.props.currentNumber + 88 }
          return {
            ...state,
            transaction: localTx,
          }
        })
      }
      this.setState({ dialogueOn })
    }
    public setTransaction = (transaction: any = tx) => {
      this.setState({ transaction })
    }
    public handleTxAction = (type: TransactionAction) => (e?: any) => {
      if (type === TransactionAction.REJECT) {
        this.setState({
          dialogueOn: false,
          transaction: tx,
        })
        chrome.runtime.sendMessage({
          action: 'returnTransactionReceipt',
          data: {
            error: -1,
            message: 'reject',
          },
        })
      }
      if (type === TransactionAction.SUBMIT) {
        this.submitTransaction().then((res: { status: string; hash: string } | { code: number; message: string }) => {
          chrome.runtime.sendMessage({
            action: 'returnTransactionReceipt',
            data: res,
          })
        })
      }
    }
    public submitTransaction = () => {
      this.setState({ txStatus: TransactionAction.SENDING })
      return this.props.nervos.appchain
        .sendTransaction(this.state.transaction)
        .then((txRes: { hash: string }) => {
          if (txRes.hash) {
            this.setState({ currentTxHash: txRes.hash, dialogueOn: false, txStatus: TransactionAction.NONE })
            return this.props.nervos.listeners.listenToTransactionReceipt(txRes.hash)
          } else {
            throw new Error('No Transaction Hash Received')
          }
        })
        .then((receipt: { errorMessage: string; transactionHash: string }) => {
          if (receipt.errorMessage) {
            throw new Error(receipt.errorMessage)
          }
          return receipt.transactionHash
        })
        .then((hash: string) => {
          this.setState(initState)
          return { status: 'OK', hash }
        })
        .catch((err: { message: string }) => {
          this.handleError(err.message)
          this.setState({ ...initState, errorMsg: err.message })
          return {
            code: -1,
            message: err.message,
          }
        })
    }
    public closeNotifier = (e: any) => {
      this.setState({
        errorMsg: '',
      })
    }
    public render() {
      const { errorMsg, dialogueOn } = this.state
      return (
        <div>
          <img className="logo" src="https://cdn.cryptape.com/images/neuron-logo.png" alt="logo" />
          <Notifier message={errorMsg} on={!!errorMsg} type={NotifierType.ERROR} handleClose={this.closeNotifier} />
          <Comp
            {...this.props}
            currentTxHash={this.state.currentTxHash}
            handleError={this.handleError}
            setDialogue={this.setDialogue}
            setTransaction={this.setTransaction}
          />
          <Dialogue fullScreen={true} dialogueOn={dialogueOn}>
            <Transaction
              handleTxAction={this.handleTxAction}
              transaction={this.state.transaction}
              handleTxEdit={this.handleTxEdit}
              chain={this.props.nervos.currentProvider.host}
              status={this.state.txStatus}
            />
          </Dialogue>
        </div>
      )
    }
  }
  return withNervos(WithUniComp)
}

export default UniComp
