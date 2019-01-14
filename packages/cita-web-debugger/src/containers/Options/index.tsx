import { Button, IconButton, TextField } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { chain } from '../../config'
import { ICITAContext, withCITA } from '../../contexts/cita'
import { IUniComp } from '../../hoc/UniComp'
import { handleInputOf } from '../../utils/compActions'

import './options.css'

const initState = {
  chainIp: window.localStorage.getItem('chainIp') || '',
  chainIpError: '',
  saved: false,
}
class Options extends React.Component<IUniComp & ICITAContext, typeof initState> {
  public readonly state = initState
  public handleInput = handleInputOf(this)
  public handleClick = (e: any) => {
    let { chainIp } = this.state
    if (!chainIp) {
      chainIp = chain
    }
    if (!chainIp.startsWith('http')) {
      this.setState({
        chainIpError: 'chain address error...',
      })
      return
    }
    window.localStorage.setItem('chainIp', chainIp)
    const provider = new this.props.cita.providers.HttpProvider(chainIp)
    this.props.cita.setProvider(provider)
    this.setState({ saved: true })
    return
  }
  public componentDidMount() {
    this.setState({
      chainIp: window.localStorage.getItem('chainIp') || '',
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
export default withCITA(Options)
