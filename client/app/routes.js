import React from 'react';
import {
  Route,
  IndexRoute
} from 'react-router';

import App from './layout';
import Welcome from './components/Welcome';
import About from './components/About';
import News from './components/News';

const routes = (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />

      <Route path="/about" component={About}></Route>
      <Route path="/news" component={News}></Route>
    </Route>
  </Route>
);

export default routes;
