import React from 'react';
import { Route } from 'react-router-dom';
import MyContent from '../Routes/mycontent/MyContent';
import Login from '../Routes/Login';
import User from '../Routes/User/User';
import Menu from '../Routes/home/Menu/Menu';
import Home from '../Routes/home/Home';
import Layout from '../Routes/layout/Layout';

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-router down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);

export const RoutesRender = routes => {
  return routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />);
};

export const routes = [
  {
    path: '/',
    component: Layout,
    routes: [
      {
        path: '/my_content/:id',
        component: MyContent,
      },
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/user/:user',
        component: User,
      },
      {
        path: '/',
        component: Menu,
        routes: [
          {
            path: '/topics/:tab',
            component: Home,
          },
          {
            path: '/',
            component: Home,
          },
        ],
      },
    ],
  },
];
