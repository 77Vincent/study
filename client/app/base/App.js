'use strict';

// External Dependencies
import React from 'react';
import { Layout, Menu, Button, Modal } from 'antd';
import { Route, Link, NavLink } from 'react-router-dom';

// Global Style
import './App.less';

// Custom Components
import App_Welcome from '../components/Welcome';
import App_Header from '../components/Header';
import App_Footer from '../components/Footer';
import App_Orientation from '../components/Orientation';
import App_About from '../components/About';
import App_Login from '../components/Login';
import App_Register from '../components/Register';

export default class App extends React.Component {
  render() {
    return (
      <Layout className='Layout'>
        <Layout.Header className='Layout-header'>
          <App_Header/ >
        </Layout.Header>

        <Layout.Content className='Layout-content'>
          <Route exact path="/" component={App_Welcome} />
          <Route exact path="/orientation" component={App_Orientation} />
          <Route exact path="/about" component={App_About} />
          <Route path="/login" component={App_Login} />
          <Route path="/register" component={App_Register} />
        </Layout.Content>

        <Layout.Footer className='Layout-footer'>
          <App_Footer/ >
        </Layout.Footer>
      </Layout>
    );
  }
}
