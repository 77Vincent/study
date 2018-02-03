// Dependencies
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Style
import './App.less';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';
import Welcome from '../components/Welcome';
import Orientation from '../components/Orientation';
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
          <Route path="/orientation" component={Orientation} />
          <Route path="/about" component={About} />
          <Route path="/news" component={News} />
        </div>

        <Footer />
      </div>
    );
  }
}
