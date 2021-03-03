import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';
import { NotFound } from '../pages/404';
import { CategoryPage } from '../pages/client/category';
import { Restaurant } from '../pages/client/restaurant';
import { Restaurants } from '../pages/client/restaurants';
import { Dashboard } from '../pages/driver/dashboard';
import { AddDish } from '../pages/owner/add-dish';
import { AddRestaurant } from '../pages/owner/add-restaurant';
import { MyRestaurant } from '../pages/owner/my-restaurant';
import { MyRestaurants } from '../pages/owner/my-restaurants';
import { ConfirmEmail } from '../pages/user/confirm-email';
import { EditProfile } from '../pages/user/edit-profile';
import { Order } from '../pages/user/order';
import { Search } from '../pages/user/search';
import { UserRole } from '../__api__/globalTypes';

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
    component: <MyRestaurants />,
  },
  {
    path: '/add-restaurant',
    component: <AddRestaurant />,
  },
  {
    path: '/my-restaurant/:id',
    component: <MyRestaurant />,
  },
  {
    path: '/restaurant/:restaurantId/add-dish',
    component: <AddDish />,
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
  {
    path: '/orders/:id',
    component: <Order />,
  },
];

const driverRoutes = [
  {
    path: '/',
    component: <Dashboard />,
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
          <Route key={route.path} path={route.path} exact>
            {route.component}
          </Route>
        ))}
        {data.me.role === UserRole.Client &&
          clientRoutes.map((route) => (
            <Route key={route.path} exact path={route.path}>
              {route.component}
            </Route>
          ))}
        {data.me.role === UserRole.Owner &&
          ownerRoutes.map((route) => (
            <Route key={route.path} exact path={route.path}>
              {route.component}
            </Route>
          ))}
        {data.me.role === UserRole.Delivery &&
          driverRoutes.map((route) => (
            <Route key={route.path} exact path={route.path}>
              {route.component}
            </Route>
          ))}
        {/* <Redirect to="/" /> */}
        {/* from="potato"하면 potato일때만 */}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
