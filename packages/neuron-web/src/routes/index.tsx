import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import routes from './routes'

const Routes = () => (
  <Router>
    <React.Fragment>
      {routes.map(route => (
        <Route key={route.path} {...route} />
      ))}
    </React.Fragment>
  </Router>
)

export default Routes
