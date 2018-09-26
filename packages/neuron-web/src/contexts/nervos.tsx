import * as React from 'react'
import nervos from '../nervos'

export interface INervosContext {
  nervos: typeof nervos
  currentNumber: number
}

const { Provider, Consumer } = React.createContext<INervosContext>(nervos)

export const NervosProvider = (props: React.Props<any>) => <Provider value={nervos}>{props.children}</Provider>

const initState = {
  currentNumber: 0,
}
export const withNervos = (Comp: typeof React.Component) =>
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
      const current = await nervos.appchain.getBlockNumber()
      this.setState({
        currentNumber: +current,
      })
    }
    public render() {
      return (
        <Consumer>
          {nervosCtx => <Comp {...this.props} nervos={nervosCtx} currentNumber={this.state.currentNumber} />}
        </Consumer>
      )
    }
  }
