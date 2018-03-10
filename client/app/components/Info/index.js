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
      <div className='Info'>
        {
          !user ? null :
            <div>
              <hgroup>
                <h1>{user.name}</h1>
                <h3>认证老师</h3>
              </hgroup>
              <section>
                <h4>简介</h4> <span>{user.bio}</span>
              </section>
              <section>
                <h4>学校</h4> <span>{user.school}</span>
              </section>
              <section>
                <h4>职位</h4> <span>{user.title}</span>
              </section>
              <section>
                <h4>性别</h4> <span>{user.gender ? '男' : '女'}</span>
              </section>
            </div>
        }
      </div>
    )
  }
}