import React from 'react';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const loading = this.props.loading;

    return (
      <div className={loading ? 'App-spinner' : null}>
        <div className={loading ? 'App-translucent' : null}>
          {this.props.children}
        </div>
      </div>
    )
  }
}