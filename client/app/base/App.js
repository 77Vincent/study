'use strict';

// External Dependencies
import React from 'react';
import { Layout, Menu, Button, message } from 'antd';
import { Route, Link, NavLink } from 'react-router-dom';

// Custom styles, components and functions
import './App.less';
import {
  Header, 
  Footer, 
  Loading, 
  Welcome, 
  About, 
  Login, 
  Forgot, 
  Register, 
  Dashboard,
  Orientation,
  Teachers
} from 'components';
import Fun from './fn.js';

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    isLogin: false,
    loading: false
  }

  componentWillMount() {
    this.verify();

    window.onhashchange = (e) => {
      this.verify();
    }

    message.config({
      top: '75px',
      duration: 2
    })
  }

  verify = async () => {
    let data = await Fun.fetch('/api/user/verify');

    this.setState({
      isLogin: data.code === 200 ? true : false
    });
    console.log(this.state.isLogin)
  }

  logout = async (e) => {
    this.setState({
      loading: true
    });

    await fetch('/api/user/logout', {
      credentials: 'include'
    });

    this.verify();
    this.setState({
      loading: false
    });
  }


  render() {
    return (
      <Layout className='App-Layout'>
        <Layout.Header className='App-Header'>
          <Header isLogin={this.state.isLogin} logout={this.logout}/>
        </Layout.Header>

        <Layout.Content className='App-Content'>
          <Loading loading={this.state.loading}>
            <Route exact path="/" component={Welcome} />
            <Route path="/orientation" component={Orientation} />
            <Route path="/teachers" component={Teachers} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/forgot" component={Forgot} />
            <Route path="/dashboard" component={Dashboard} />
          </Loading>
        </Layout.Content>

        <Layout.Footer className='App-Footer'>
          <Footer />
        </Layout.Footer>
      </Layout>
    );
  }
}
