import { MuiThemeProvider } from '@material-ui/core/styles'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppChainProvider } from './contexts/appchain'
import theme from './theme'

import './common.css'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import Routes from './routes'

ReactDOM.render(
  <AppChainProvider>
    <MuiThemeProvider theme={theme}>
      <Routes />
    </MuiThemeProvider>
  </AppChainProvider>,
  document.getElementById('root') as HTMLElement,
)
registerServiceWorker()
