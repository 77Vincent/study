import React, { Component } from 'React';
import fetch from 'isomorphic-fetch';
export default class Welcome extends  Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    fetch('/api/majors').then(res=>res.json()).then((res)=> console.log(res) );
  }
  render(){
    return (
      <div>
        This is welcome page11111
      </div>);
  }
}