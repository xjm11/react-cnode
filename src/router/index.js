import React from 'react';
import { Route } from 'react-router-dom';
import MyContent from '../routes/mycontent/MyContent';
import Login from '../routes/login/Login.jsx';
import User from '../routes/user/User.jsx';
import Menu from '../routes/home/Menu/Menu.jsx';
import Home from '../routes/home/Home.jsx';
import Layout from '../routes/layout/Layout.jsx';

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
