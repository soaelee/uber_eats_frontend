import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from '../pages/login';
import { Signup } from '../pages/signup';

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};

// local-only-field를 업데이트하는 주체! not app but here
