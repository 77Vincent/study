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
        <div className='appendix clearfix container'>
          <div className='float-left'>© 2005 - 2018 Wyzant, Inc. - All Rights Reserved</div>

          <div className='sub-appendix float-right'>
            <a href='' className='button-bold'>Terms of use</a>
            <a href='' className='button-bold'>Privacy Policy</a>
          </div>
        </div>
      </div>
    );
  }
}