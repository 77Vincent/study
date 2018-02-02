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
    return (
      <div className='Header clearfix container-fluid'>
        <h1 className='title'>Website Title</h1>

        <div className='nav'>
          <a>About</a>
          <a>About</a>
          <a>About</a>
        </div>
      </div>
    );
  }
}