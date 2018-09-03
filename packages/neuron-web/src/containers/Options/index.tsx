import { Button, IconButton, TextField } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import * as React from 'react'
import { Link } from 'react-router-dom'
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
    const { chainIp } = this.state
    if (!chainIp.startsWith('http')) {
      this.setState({
        chainIpError: 'Protocol required',
      })
      return
    }
    window.localStorage.setItem('chainIp', chainIp)
    this.props.nervos.setProvider(chainIp)
    this.setState({ saved: true })
    return
  }
  public render() {
    const { chainIp, chainIpError, saved } = this.state
    return (
      <div className="options__container">
        <TextField
          label="chain"
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
