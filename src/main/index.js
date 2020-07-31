import { Route, Switch, Redirect } from 'react-router-dom';
import React, { lazy } from 'react';

import Navbar from './navbar/Navbar';

// ---------Lazy loading---------
// Import components here whose rendering is condionally
const Dashboard = lazy(() => import('./dashboard/Dashboard'));

// Add every new route here which will be used with authentication.
const routes = [
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
  },
  {
    path: '*',
    render: () => <Redirect to="/dashboard" />,
  },
];

export default function () {
  return (
    <div>
      <Navbar />
      <Switch>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Switch>
    </div>
  );
}
