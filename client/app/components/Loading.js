import React from 'react'

export default class Loading extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const isLoading = this.props.isLoading
    return (
      <div className={isLoading ? 'App-spinner' : null}>
        <div className={isLoading ? 'App-translucent' : null}>
          {this.props.children}
        </div>
      </div>
    )
  }
}