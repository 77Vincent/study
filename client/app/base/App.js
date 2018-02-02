import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.less';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Welcome from '../components/Welcome';
import About from '../components/About';
import News from '../components/News';

// @connect((state, props) => ({}))
export default class App extends Component {
  render() {
    return (
      <div>
        <Header />

        <div className='main-container'>
          <Route exact path="/" component={Welcome} />
          <Route path="/about" component={About} />
          <Route path="/news" component={News} />
        </div>

        <Footer />
      </div>
    );
  }
}
