import React, { Component } from 'react';
import { Row, Col, Button, Menu } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { WSAEINPROGRESS } from 'constants';
import './index.less';

export default class Header extends  Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
  }
  render(){

    const links = [{
      title: 'About us',
      href: '/about'
    }, {
      title: 'News',
      href: '/news'
    }];

    return (
      <div>
        <Link to='/'><h1>Website Title</h1></Link>
        <Menu 
          mode='horizontal' 
          style={{ lineHeight: '64px' }}>
          {
            links.map((item, index) => {
              return (
                <Menu.Item>
                  <NavLink key={index} className='button-bold' activeClassName='toggle' to={item.href}>
                    {item.title}
                  </NavLink>
                </Menu.Item>
              )
            })
          }
          <Menu.Item>Sign in</Menu.Item>
          <Menu.Item>Sign in</Menu.Item>
        </Menu>
      </div>
    );
  }
}