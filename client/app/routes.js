import React from 'react';
import {
  Route,
  IndexRoute
} from 'react-router';
import App from './layout';
import Welcome from './components/Welcome';

const routes = (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="/test" component={App}>
      </Route>
    </Route>
  </Route>
);

export default routes;
