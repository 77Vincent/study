import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import './index.less';

export default class Header extends  Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
  }
  render(){
    return (
      <div className='Header'>
        <h1>Website Title</h1>
      </div>
    );
  }
}