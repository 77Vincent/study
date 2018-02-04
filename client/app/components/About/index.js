import React from 'react';
import fetch from 'isomorphic-fetch';

export default class Welcome extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.fetchData() 
  }
  async fetchData() {
  }
  render(){
    console.log()
    // Temp variables
    const placeholder = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;

    return (
      <div className='About'>
        {placeholder}
        {placeholder}
      </div>
    );
  }
}