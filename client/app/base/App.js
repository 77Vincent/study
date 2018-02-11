'use strict';

// External Dependencies
import React from 'react';
import { Layout, Menu, Button, message } from 'antd';
import { Route, Link, NavLink } from 'react-router-dom';

// Global custom Style
import './App.less';

// Custom Components
import Components from 'components';

export default class App extends React.Component {
  componentDidMount() {
    message.config({
      top: '75px',
      duration: 2
    })
  }

  render() {
    return (
      <Layout className='App-Layout'>
        <Layout.Header className='App-Header'>
          <Components.Header/ >
        </Layout.Header>

        <Layout.Content className='App-Content'>
          <Route exact path="/" component={Components.Welcome} />
          <Route path="/orientation" component={Components.Orientation} />
          <Route path="/teachers" component={Components.Teachers} />
          <Route path="/about" component={Components.About} />
          <Route path="/login" component={Components.Login} />
          <Route path="/register" component={Components.Register} />
          <Route path="/forgot" component={Components.Forgot} />
          <Route path="/dashboard" component={Components.Dashboard} />
        </Layout.Content>

        <Layout.Footer className='App-Footer'>
          <Components.Footer/ >
        </Layout.Footer>
      </Layout>
    );
  }
}
