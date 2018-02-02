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
    // Temp variables
    const placeholder = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;
    const promote = ['Why Here', 'Testimonial', 'Contact Us'];

    return (
      <div className='Welcome'>
        <div className='intro'>
          <div className='slogan container'>
            <h1>
                We expertize in overseas studying<br/>
                Get the right tutor you need<br/>
                Share the knowledge you have
            </h1>
            <p>{placeholder}</p>
          </div>

          <div className='action container'>
            <a href='' className='button-border'>Find a tutor</a>
            <a href='' className='button-border'>Be a tutor</a>
          </div>
        </div>

        <div className='promote container'>
          {
            promote.map((item, index) => {
              return <div key={index} className='sub-promote'> <h1>{item}</h1> <p>{placeholder}</p> </div>;
            })
          }
        </div>
      </div>
    );
  }
}