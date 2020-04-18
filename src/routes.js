import React from 'react';
import { isAuthenticated } from './services/auth'
import Login from './pages/SignUp/'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

const PrivateRoute = function ({ component: Component, ...rest }) {
  return (
    <Route {...rest}
      render={(props) => (

        isAuthenticated() ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          )
      )
      }
    />
  )
}
function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/app" component={() => <h1> Você está logado </h1>} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;