import * as React from 'react'
import cita from '../cita'

export interface ICITAContext {
  cita: any
  currentNumber: number
}

const { Provider, Consumer } = React.createContext<typeof cita>(cita)

export const CITAProvider = (props: React.Props<any>) => <Provider value={cita}>{props.children}</Provider>

const initState = {
  currentNumber: 0,
}
export const withCITA = (Comp: typeof React.Component) =>
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
      const current = await cita.base.getBlockNumber()
      this.setState({
        currentNumber: +current,
      })
    }
    public render() {
      return (
        <Consumer>
          {citaCtx => <Comp {...this.props} cita={citaCtx} currentNumber={this.state.currentNumber} />}
        </Consumer>
      )
    }
  }
