import React from 'react'
import Home from '../src/pages/Home'
import Login from '../src/pages/Login'
import SignUp from '../src/pages/SignUp'
import MainApp from './pages/MainApp'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { isAuthenticated } from './auth'

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isAuthenticated() ? <Redirect to={{ pathname: '/app', state: { from: props.location } }} /> : <Component {...props} />)}
  />
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isAuthenticated() ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)}
  />
)

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute exact path="/" component={() => <Home />} />
      <PublicRoute exact path="/login" component={() => <Login />} />
      <PublicRoute exact path="/signup" component={() => <SignUp />} />
      <PrivateRoute path="/app" component={() => <MainApp />} />
    </Switch>
  </BrowserRouter>
)

export default Routes
