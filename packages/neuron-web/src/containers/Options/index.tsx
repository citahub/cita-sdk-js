import { Button, IconButton, TextField } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { chain } from '../../config'
import { INervosContext, withNervos } from '../../contexts/nervos'
import { IUniComp } from '../../hoc/UniComp'
import { handleInputOf } from '../../utils/compActions'

import './options.css'

const initState = {
  chainIp: window.localStorage.getItem('chainIp') || '',
  chainIpError: '',
  saved: false,
}
class Options extends React.Component<IUniComp & INervosContext, typeof initState> {
  public readonly state = initState
  public handleInput = handleInputOf(this)
  public handleClick = (e: any) => {
    let { chainIp } = this.state
    if (!chainIp) {
      chainIp = chain
    }
    if (!chainIp.startsWith('http')) {
      this.setState({
        // chainIpError: 'Protocol required',
        chainIpError: 'chain address error...',
      })
      return
    }
    window.localStorage.setItem('chainIp', chainIp)
    this.props.nervos.setProvider(chainIp)
    this.setState({ saved: true })
    return
  }
  public componentDidMount() {
    this.setState({
      chainIp: window.localStorage.getItem('chainIp') || '',
      // chainIp: this.props.nervos.currentProvider ? this.props.nervos.currentProvider.host : '',
    })
  }
  public render() {
    const { chainIp, chainIpError, saved } = this.state
    return (
      <div className="options__container">
        <TextField
          label="Chain Address"
          value={chainIp}
          helperText={chainIpError}
          error={!!chainIpError}
          onChange={this.handleInput('chainIp')}
        />

        <Button onClick={this.handleClick}>Save</Button>
        <Link to="/transactions">
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Link>
        <div>{saved ? 'saved' : ''}</div>
      </div>
    )
  }
}
export default withNervos(Options)
