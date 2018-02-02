import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import './index.less';
import { WSAEINPROGRESS } from 'constants';

export default class Header extends  Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
  }
  render(){
    const links = [{
      title: 'About us',
      href: ''
    }, {
      title: 'News',
      href: ''
    }, {
      title: 'Forum',
      href: ''
    }];

    const fns = [{
      title: 'Sign in',
      href: ''
    }, {
      title: 'Sign up',
      href: ''
    }];

    return (
      <div className='Header clearfix container-fluid fixed-top'>
        <h1 className='float-left'>Website Title</h1>

        <div className='float-right'>
          {
            links.map((item, index) => {
              return <a key={index} className='button-bold' href={item.href}>{item.title}</a>
            })
          }
          {
            fns.map((item, index) => {
              return <a key={index} className='button-border' href={item.href}>{item.title}</a>
            })
          }
        </div>
      </div>
    );
  }
}