import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';
import { NotFound } from '../pages/404';
import { CategoryPage } from '../pages/client/category';
import { Restaurant } from '../pages/client/restaurant';
import { Restaurants } from '../pages/client/restaurants';
import { MyRestaurant } from '../pages/owner/my-restaurant';
import { ConfirmEmail } from '../pages/user/confirm-email';
import { EditProfile } from '../pages/user/edit-profile';
import { Search } from '../pages/user/search';

const clientRoutes = [
  {
    path: '/',
    component: <Restaurants />,
  },
  {
    path: '/search',
    component: <Search />,
  },
  {
    path: '/category/:slug',
    component: <CategoryPage />,
  },
  {
    path: '/restaurants/:id',
    component: <Restaurant />,
  },
];

const ownerRoutes = [
  {
    path: '/',
    component: <MyRestaurant />,
  },
];
const commonRoutes = [
  {
    path: '/confirm',
    component: <ConfirmEmail />,
  },
  {
    path: '/edit-profile',
    component: <EditProfile />,
  },
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
        {commonRoutes.map((route) => (
          <Route path={route.path}>{route.component}</Route>
        ))}
        {data.me.role === 'Client' &&
          clientRoutes.map((route) => (
            <Route key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {data.me.role === 'Owner' &&
          ownerRoutes.map((route) => (
            <Route key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {/* <Redirect to="/" /> */}
        {/* from="potato"하면 potato일때만 */}
        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
