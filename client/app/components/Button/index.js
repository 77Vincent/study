import React from 'react'
import './index.less'

export default class Button extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    isClick: false
  }
  click = () => {
    this.setState({
      isClick: true
    })
    setTimeout(() => {
      this.setState({
        isClick: false
      })
    }, 300)
  }
  render() {
    return (
      <button onClick={this.click} className={`Button ${this.state.isClick ? 'Button-click' : ''}`} {...this.props}>
        <div className='Button-wrapper'>
          {this.props.children}
        </div>
      </button>
    )
  }
}