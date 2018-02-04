'use strict';

// Dependencies
import React, { Component } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Route, Link, NavLink } from 'react-router-dom';

// Global Style
import './App.less';

// Components
import Welcome from '../components/Welcome';
import Orientation from '../components/Orientation';
import About from '../components/About';
import News from '../components/News';
import Login from '../components/Login';

const { Content, Header, Footer } = Layout;

export default class App extends Component {
  render() {
    const links = [{
      title: 'About us',
      href: '/about'
    }, {
      title: 'News',
      href: '/news'
    }];

    return (
      <div>
        <Layout>
          <Header className='App-header'>
            <Menu 
              mode='horizontal' 
              className='App-menu'
            >
              <Menu.Item><Link to='/' className="App-logo" /></Menu.Item>

              {
                links.map((item, index) => {
                  return <Menu.Item><NavLink key={index} to={item.href}>{item.title}</NavLink></Menu.Item>
                })
              }

              <Menu.Item><Button><Link to='/login'>Sign in</Link></Button></Menu.Item>
              <Menu.Item><Button><Link to='/register'>Sign up</Link></Button></Menu.Item>
            </Menu>
          </Header>

          <Content className='App-content'>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/orientation" component={Orientation} />
            <Route exact path="/about" component={About} />
            <Route exact path="/news" component={News} />
            {/* <Route path="/login" component={Login} /> */}
          </Content>

          <Footer className='App-footer'>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </div>
    );
  }
}

