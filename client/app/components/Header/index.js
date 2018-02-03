import React, { Component } from 'react';
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
      <div className='Header clearfix container-fluid fixed-top'>
        <h1 className='float-left'>
          <Link to='/'>Website Title</Link>
        </h1>

        <div className='float-right'>
          {
            links.map((item, index) => {
              return <NavLink key={index} className='button-bold' activeClassName='toggle' to={item.href}>{item.title}</NavLink>
            })
          }
          <button className='button-border'>Sign in</button>
          <button className='button-border'>Sign up</button>
        </div>
      </div>
    );
  }
}