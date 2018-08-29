import * as React from 'react'
import Dialogue from '../components/Dialogue'
import Transaction, { tx } from '../components/Transaction'
import './brand.css'

export interface IUniComp {
  handleError: (errorMsg: string) => void
  setDialogue: (dialogueOn: boolean) => void
  setTransaction: (transaction: typeof tx) => void
}

/**
 * @param Comp
 * Add brand, error handler, transaction dialog
 */
const UniComp = (Comp: typeof React.Component) =>
  class extends React.Component {
    public readonly state = {
      dialogueOn: false,
      errorMsg: '',
      transaction: tx,
    }

    public handleError = (errorMsg: string) => {
      this.setState({
        errorMsg,
      })
    }
    public setDialogue = (dialogueOn: boolean = false) => {
      this.setState({ dialogueOn })
    }
    public setTransaction = (transaction?: any = tx) => {
      this.setState({ transaction })
    }
    public render() {
      const { errorMsg, dialogueOn } = this.state
      return (
        <div>
          <img className="logo" src="https://cdn.cryptape.com/images/neuron-logo.png" alt="logo" />
          <span>{errorMsg}</span>
          <Comp
            {...this.props}
            handleError={this.handleError}
            setDialogue={this.setDialogue}
            setTransaction={this.setTransaction}
          />
          <Dialogue fullScreen={true} dialogueOn={dialogueOn}>
            <Transaction />
          </Dialogue>
        </div>
      )
    }
  }

export default UniComp
