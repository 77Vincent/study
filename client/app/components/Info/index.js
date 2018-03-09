import React from 'react'
import { Link } from 'react-router-dom'
import { Tag, Row, Col } from 'antd'
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
              <h1>{user.name}</h1>
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
                <h4>生日</h4> <span>{user.birthday}</span>
              </section>
            </div>
        }
      </div>
    )
  }
}