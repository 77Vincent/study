/**
 * Xfolio entry file 
 */

 'use strict'

import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

import { Provider } from 'react-redux';
import { store } from 'store/configureStore';

import App from './base/App.js'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
  () => {
    // remove initial spinning loader after react dom is rendered
    document.getElementById('root').classList.remove('App-spinner')
  }
)
