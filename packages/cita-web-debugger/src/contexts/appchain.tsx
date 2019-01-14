import * as React from 'react'
import appchain from '../appchain'

export interface IAppChainContext {
  appchain: typeof appchain
  currentNumber: number
}

const { Provider, Consumer } = React.createContext<typeof appchain>(appchain)

export const AppChainProvider = (props: React.Props<any>) => <Provider value={appchain}>{props.children}</Provider>

const initState = {
  currentNumber: 0,
}
export const withAppChain = (Comp: typeof React.Component) =>
  class extends React.Component<{}, typeof initState> {
    public readonly state = initState
    private timer: any

    public componentDidMount() {
      this.updateHeight()

      this.timer = setInterval(this.updateHeight, 1000)
    }
    public componentWillUnmount() {
      clearInterval(this.timer)
    }
    public updateHeight = async () => {
      const current = await appchain.base.getBlockNumber()
      this.setState({
        currentNumber: +current,
      })
    }
    public render() {
      return (
        <Consumer>
          {appchainCtx => <Comp {...this.props} appchain={appchainCtx} currentNumber={this.state.currentNumber} />}
        </Consumer>
      )
    }
  }
