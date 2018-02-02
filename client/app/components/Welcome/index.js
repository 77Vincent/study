import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import './index.less';

export default class Welcome extends  Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.fetchData() 
  }
  async fetchData() {
  }
  render(){
    return (
      <div className='Welcome'>
        <div className='intro'>
          <div className='slogan container'>
            <h1>Get the right tutor you need<br/>Share the knowledge you have</h1>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          </div>

          <div className='action container'>
            <a href='' className='button-border'>Find tutor</a>
            <a href='' className='button-border'>Be a tutor</a>
          </div>
        </div>
      </div>
    );
  }
}