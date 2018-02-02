import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import './index.less';

export default class Welcome extends  Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
  }
  render(){
    return (
      <div className='Welcome container'>
        <h1 className='slogan'>Get the right tutor you need, share the knowledge you have.</h1>
      </div>
    );
  }
}