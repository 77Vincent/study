import 'babel-polyfill';
import ReactDOM from 'react-dom';
import React from 'react';
import { hashHistory, Router } from 'react-router';
import routes from './routes';
import '../node_modules/normalize.css/normalize.css'; // CSS normalizer
// TODO: 上redux这里还需要操作
// history.listen(location => console.log('location:', location))
// history.listen(function (location) { return location })

ReactDOM.render(
  <Router history={hashHistory} >
    { routes }
  </Router>,
  document.getElementById('root')
);
