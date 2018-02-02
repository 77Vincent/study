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
          <a className='button-bold' href=''>About</a>
          <a className='button-bold' href=''>About</a>
          <a className='button-bold' href=''>About</a>
          <a className='button-border' href=''>Sign in</a>
          <a className='button-border' href=''>Sign up</a>
        </div>
      </div>
    );
  }
}