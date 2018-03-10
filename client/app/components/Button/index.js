import React from 'react'
import './index.less'

export default class Button extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <button className='Button' {...this.props}>
        <div className='Button-wrapper'>
          {this.props.children}
        </div>
      </button>
    )
  }
}