import React from 'react'
import { Link } from 'react-router-dom'
import { Tag } from 'antd'
import './index.less'

export default class Info extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const user = this.props.user

    return (
      <div>
        {
          !user ? null :
            <div>
              <h1>{user.name}</h1>
              <h4>学校：{user.school}</h4>
              <h4>职位：{user.title}</h4>
              <h4>手机号: {user.mobilephone}</h4>
              <h4>生日：{user.birthday ? user.birthday : <small>未设置</small>}</h4>
            </div>
        }
      </div>
    )
  }
}