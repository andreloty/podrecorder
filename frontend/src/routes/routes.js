import React, { useContext } from 'react'
import Home from '../pages/Home'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import MainApp from '../pages/MainApp'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import AuthContext from './../services/auth'
import NewRecording from '../pages/NewRecording'

const Routes = () => {
  const { isAuthenticated } = useContext(AuthContext)

  const checkRoute = (route) => {
    const pathname = route.state ? route.state.from.pathname : route.pathname
    const publicRoutes = ['/', '/login', '/signup']

    const isPublic = publicRoutes.filter((i) => i === pathname).length > 0

    return isPublic ? '/app' : pathname
  }

  const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Redirect to={{ pathname: checkRoute(props.location), state: { from: props.location } }} /> : <Component {...props} />
      }
    />
  )

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (isAuthenticated ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)}
    />
  )

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/" component={() => <Home />} />
        <PublicRoute path="/login" component={() => <Login />} />
        <PublicRoute path="/signup" component={() => <SignUp />} />
        <PrivateRoute path="/app" component={() => <MainApp />} />
        <PrivateRoute path="/new" component={() => <NewRecording />} />
      </Switch>
    </BrowserRouter>
  )
}
export default Routes
