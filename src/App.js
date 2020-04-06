import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import { routes, RoutesRender } from './router/index';

const App = () => (
  <Provider store={store}>
    <Router>
      {RoutesRender(routes)}
    </Router>
  </Provider>
);

export default App;
