import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';
import { NotFound } from '../pages/404';
import { Category } from '../pages/client/category';
import { Restaurants } from '../pages/client/restaurants';
import { ConfirmEmail } from '../pages/user/confirm-email';
import { EditProfile } from '../pages/user/edit-profile';
import { Search } from '../pages/user/search';

const ClientRoutes = [
  <Route path="/" exact key={1}>
    <Restaurants />
  </Route>,
  <Route path="/confirm" exact key={2}>
    <ConfirmEmail />
  </Route>,
  <Route path="/edit-profile" exact key={3}>
    <EditProfile />
  </Route>,
  <Route path="/search" exact key={4}>
    <Search />
  </Route>,
  <Route path="/category/:slug" exact key={5}>
    <Category />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || error || loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === 'Client' && ClientRoutes}
        {/* <Redirect to="/" /> */}
        {/* from="potato"하면 potato일때만 */}
        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
