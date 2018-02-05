'use strict';

// External Dependencies
import React, { Component } from 'react';
import { Layout, Menu, Button, Modal } from 'antd';
import { Route, Link, NavLink } from 'react-router-dom';

// Global custom Style
import './App.less';

// Custom Components
import Components from 'components';

export default class App extends React.Component {
  render() {
    return (
      <Layout className='Layout'>
        <Layout.Header className='Layout-header'>
          <Components.Header/ >
        </Layout.Header>

        <Layout.Content className='Layout-content'>
          <Route exact path="/" component={Components.Welcome} />
          <Route path="/orientation" component={Components.Orientation} />
          <Route path="/about" component={Components.About} />
          <Route path="/login" component={Components.Login} />
          <Route path="/register" component={Components.Register} />
        </Layout.Content>

        <Layout.Footer className='Layout-footer'>
          <Components.Footer/ >
        </Layout.Footer>
      </Layout>
    );
  }
}
