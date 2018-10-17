import * as React from 'react'
import Dialogue from '../components/Dialogue'
import EncryptedMessage from '../components/EncryptedMessage'
import Notifier, { NotifierType } from '../components/Notifier'
import Transaction, { tx } from '../components/Transaction'
import { INervosContext, withNervos } from '../contexts/nervos'
import './brand.css'

export interface IUniComp {
  currentTxHash: string
  handleError: (errorMsg: string) => void
  setDialogue: (dialogueOn?: boolean) => void
  setTransaction: (transaction?: typeof tx) => void
  setEncryptedMessage: (encryptedMessage: string) => void
  // handleUniInput: (key: string) => (e?: any) => void
}

export enum TransactionAction {
  NONE,
  REJECT,
  SUBMIT,
  SENDING,
}

export enum EncryptedMessageAction {
  NONE,
  REJECT,
  SUBMIT,
  SENDING,
}
export interface IChainInfo {
  address: string
  id: string
}

export interface IManifest {
  chainSet: {
    [index: string]: string
  }
  entry: string
  icon: string
  name: string
  provider: string
}

const initManifest: IManifest = {
  chainSet: {},
  entry: '',
  icon: '',
  name: '',
  provider: '',
}
const initChainInfo: IChainInfo = {
  address: '',
  id: '',
}

const initState = {
  appId: 0,
  chainInfo: initChainInfo,
  currentTxHash: '',
  dappId: 0,
  dialogueOn: false,
  encryptedMessage: '',
  errorMsg: '',
  fromAccount: '',
  manifest: initManifest,
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
      // load manifest
      const m = window.localStorage.getItem('manifest')
      if (m) {
        try {
          const manifest = JSON.parse(m)
          const { chainSet } = manifest
          const ids = Object.keys(chainSet)
          tx.chainId = ids[0]
          this.props.nervos.setProvider(chainSet[tx.chainId])
        } catch (e) {
          window.console.error(e)
        }
      }
      if (chrome && chrome.runtime && chrome.runtime.onMessage) {
        chrome.runtime.onMessage.addListener((message, sender, res) => {
          const { action, data } = message
          let chainInfo = initChainInfo
          if (data.manifest) {
            chainInfo = this.getChainFromManifest(data.manifest)
          }
          if (action === 'confirm') {
            this.setState({
              appId: data.appId,
              chainInfo,
              dappId: data.dappId,
              dialogueOn: true,
              encryptedMessage: data.encryptedMessage || '',
              fromAccount: data.fromAccount || '',
              manifest: data.manifest || initManifest,
              transaction: data.transaction || tx,
            })
          }
        })
      }
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
    public handleEncryptedMessageEdit = (e: any) => {
      this.setState({ encryptedMessage: e.currentTarget.value })
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
    public setEncryptedMessage = (encryptedMessage: string = '') => {
      this.setState({ encryptedMessage })
    }
    public handleTxAction = (type: TransactionAction) => (e?: any) => {
      if (type === TransactionAction.REJECT) {
        this.setState({
          dialogueOn: false,
          transaction: tx,
        })
        if (chrome && chrome.runtime) {
          chrome.runtime.sendMessage({
            action: 'returnTransactionReceipt',
            data: {
              error: -1,
              message: 'reject',
            },
          })
        }
      }
      if (type === TransactionAction.SUBMIT) {
        this.submitTransaction().then((res: { status: string; hash: string } | { code: number; message: string }) => {
          if (chrome && chrome.runtime) {
            chrome.runtime.sendMessage({
              action: 'returnTransactionReceipt',
              data: res,
            })
          }
        })
      }
    }
    public handleEncryptedMessageAction = (type: EncryptedMessageAction) => (e: any) => {
      this.setState({
        dialogueOn: false,
        encryptedMessage: '',
        fromAccount: '',
      })
      if (type === EncryptedMessageAction.REJECT) {
        if (chrome && chrome.runtime) {
          chrome.runtime.sendMessage({
            action: 'returnSignedMessage',
            data: {
              error: -1,
              message: 'reject',
            },
          })
        }
      }
      if (type === EncryptedMessageAction.SUBMIT) {
        const account = this.props.nervos.appchain.accounts.wallet[0]
        if (!account) {
          if (chrome && chrome.runtime) {
            chrome.runtime.sendMessage({
              action: 'returnSignedMessage',
              data: {
                error: -1,
                message: 'no account',
              },
            })
          }
          return
        }
        if (account.address.toLowerCase() !== this.state.fromAccount.toLowerCase()) {
          if (chrome && chrome.runtime) {
            chrome.runtime.sendMessage({
              action: 'returnSignedMessage',
              data: {
                error: -1,
                message: 'account not found',
              },
            })
          }
          return
        }
        if (chrome && chrome.runtime) {
          chrome.runtime.sendMessage({
            action: 'returnSignedMessage',
            data: account.sign(this.state.encryptedMessage),
          })
        }
      }
    }

    public getChainFromManifest = (manifest: IManifest): IChainInfo => {
      if (manifest.name && manifest.chainSet) {
        const chainIds = Object.keys(manifest.chainSet)
        if (chainIds[0]) {
          return {
            address: manifest.chainSet[chainIds[0]],
            id: chainIds[0],
          }
        }
      }
      return {
        address: '',
        id: '',
      }
    }
    public submitTransaction = () => {
      const { chainInfo } = this.state
      try {
        if (chainInfo.address) {
          this.props.nervos.setProvider(chainInfo.address)
        }
      } catch (err) {
        window.console.error(err)
      }
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
      const { errorMsg, dialogueOn, encryptedMessage, transaction, manifest, txStatus } = this.state
      return (
        <div>
          {/*
          <img className="logo" src="https://cdn.cryptape.com/images/neuron-logo.png" alt="logo" />
        */}
          <Notifier message={errorMsg} on={!!errorMsg} type={NotifierType.ERROR} handleClose={this.closeNotifier} />
          <Comp
            {...this.props}
            currentTxHash={this.state.currentTxHash}
            handleError={this.handleError}
            setDialogue={this.setDialogue}
            setTransaction={this.setTransaction}
            setEncryptedMessage={this.setEncryptedMessage}
          />
          <Dialogue fullScreen={true} dialogueOn={dialogueOn}>
            {!encryptedMessage ? (
              <Transaction
                handleTxAction={this.handleTxAction}
                transaction={transaction}
                manifest={manifest}
                handleTxEdit={this.handleTxEdit}
                chain={this.props.nervos.currentProvider.host}
                status={txStatus}
              />
            ) : (
              <EncryptedMessage
                encryptedMessage={encryptedMessage}
                handleEncryptedMessageEdit={this.handleEncryptedMessageEdit}
                handleEncryptedMessageAction={this.handleEncryptedMessageAction}
              />
            )}
          </Dialogue>
        </div>
      )
    }
  }
  return withNervos(WithUniComp)
}

export default UniComp
