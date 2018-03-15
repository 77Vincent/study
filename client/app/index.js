import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './base/App.js'

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root'),
  () => {
    // remove initial spinning loader after react dom is rendered
    document.getElementById('root').classList.remove('App-spinner')
  }
)
