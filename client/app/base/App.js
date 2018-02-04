// Dependencies
import React, { Component } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Route, Link, NavLink } from 'react-router-dom';

// Style
import './App.less';

// Components
// import Header from '../components/Header';
import Welcome from '../components/Welcome';
import Orientation from '../components/Orientation';
import About from '../components/About';
import News from '../components/News';

const { Content, Header, Footer } = Layout;

// @connect((state, props) => ({}))
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
            <Link to='/' className="App-logo" />
            <Menu 
              mode='horizontal' 
              style={{ lineHeight: '64px' }}
            >
              {
                links.map((item, index) => {
                  return <Menu.Item><NavLink key={index} to={item.href}>{item.title}</NavLink></Menu.Item>
                })
              }
              <Menu.Item><Button><Link to='/signin'>Sign in</Link></Button></Menu.Item>
              <Menu.Item><Button><Link to='/signup'>Sign up</Link></Button></Menu.Item>
            </Menu>
          </Header>

          <Content className='App-content'>
            <Route exact path="/" component={Welcome} />
            <Route path="/orientation" component={Orientation} />
            <Route path="/about" component={About} />
            <Route path="/news" component={News} />
          </Content>

          <Footer className='App-footer'>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </div>
    );
  }
}

