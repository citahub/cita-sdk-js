import { MuiThemeProvider } from '@material-ui/core/styles'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { NervosProvider } from './contexts/nervos'
import theme from './theme'

import './index.css'
import registerServiceWorker from './registerServiceWorker'
import Routes from './routes'

ReactDOM.render(
  <NervosProvider>
    <MuiThemeProvider theme={theme}>
      <Routes />
    </MuiThemeProvider>
  </NervosProvider>,
  document.getElementById('root') as HTMLElement,
)
registerServiceWorker()
