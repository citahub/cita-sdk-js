import * as React from 'react'
import './brand.css'

export interface IBrandAndErrorHandler {
  handleError: (errorMsg: string) => void
}

const withBrandAndErrorHandler = (Comp: typeof React.Component) =>
  class extends React.Component {
    public readonly state = {
      errorMsg: '',
    }

    public handleError = (errorMsg: string) => {
      this.setState({
        errorMsg,
      })
    }
    public render() {
      return (
        <div>
          <img className="logo" src="https://cdn.cryptape.com/images/neuron-logo.png" alt="logo" />
          <span>{this.state.errorMsg}</span>
          <Comp {...this.props} handleError={this.handleError} />
        </div>
      )
    }
  }

export default withBrandAndErrorHandler
