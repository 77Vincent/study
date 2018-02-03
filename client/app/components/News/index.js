import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
var moment = require('moment');
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
    // Temp variables
    const placeholder = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;
    const news = [
      {
        title: 'Title has an max length of 255 characters',
        created_at: moment().format(),
        body: placeholder 
      },
      {
        title: 'Title has an max length of 255 characters',
        created_at: moment().format(),
        body: placeholder 
      },
      {
        title: 'Title has an max length of 255 characters',
        created_at: moment().format(),
        body: placeholder 
      },
      {
        title: 'Title has an max length of 255 characters',
        created_at: moment().format(),
        body: placeholder 
      },
    ]

    return (
      <div className='News container'>
        {
          news.map((item, index) => {
            return (
              <div key={index} className='post'>
                <h2>{item.title}</h2>
                <div>{item.created_at}</div>
                <p>{item.body}</p>
              </div>
            )
          })
        }
      </div>
    );
  }
}