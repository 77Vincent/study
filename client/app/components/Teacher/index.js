import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Button, Row, Col, Tag } from 'antd'
import './index.less'

export default class Teacher extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const teacher = this.props.teacher
    const brief = teacher.bio.length <= 50 ? teacher.bio : `${teacher.bio.slice(0, 50)}...`

    return (
      <div className='Teacher'>
        <Row type='flex'>
          <Col>
            <aside>
              <div className='App-avatar' style={{backgroundImage: `url(${teacher.avatar})`}} />
              <h4>{teacher.name}</h4>
            </aside>
          </Col>

          <Col style={{flex: 1}}>
            <article>
              <header>
                {
                  teacher.majors && teacher.majors.map((major, index) => <Tag key={index}>{major}</Tag> )
                }
                <h4>
                  {teacher.school ? <span>{teacher.school}</span> : null}
                  {teacher.title ? <span>{teacher.title}</span> : null}
                </h4>
              </header>

              <p>{brief}</p>

              <Row type='flex' align='bottom'>
                <Col span={10}>
                  <small>已授课时长: {teacher.sold}小时</small>
                </Col>
              </Row>
            </article>
          </Col>
        </Row>
      </div>
    )
  }
}
