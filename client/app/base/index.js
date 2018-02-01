import React, { Component } from 'react';

// @connect((state, props) => ({}))
export default class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div id="container">
        {children}
      </div>
    );
  }
}
