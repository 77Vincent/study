import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'; // CSS normalizer
import './index.less';
import Header from '../components/Header';
import Footer from '../components/Footer';

// @connect((state, props) => ({}))
export default class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Header/>

        <div className='main-container'>
          {children}
        </div>
        
        <Footer/>
      </div>
    );
  }
}
