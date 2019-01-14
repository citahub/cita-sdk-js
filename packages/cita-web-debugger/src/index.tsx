import { MuiThemeProvider } from '@material-ui/core/styles'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CITAProvider } from './contexts/cita'
import theme from './theme'

import './common.css'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import Routes from './routes'

ReactDOM.render(
  <CITAProvider>
    <MuiThemeProvider theme={theme}>
      <Routes />
    </MuiThemeProvider>
  </CITAProvider>,
  document.getElementById('root') as HTMLElement,
)
registerServiceWorker()
