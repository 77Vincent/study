import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import './index.less';

export default class Footer extends  Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
  }
  render(){
    return (
      <div className='Footer'>
        <h1>Footer</h1>
      </div>
    );
  }
}