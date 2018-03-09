import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import './index.less'

export default class Account extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Button onClick={this.props.logout}>注销账户</Button>
      </div>
    )
  }
}