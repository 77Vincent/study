import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Row, Col, Tag } from 'antd';
import Components from 'components';
import './index.less';
import { isDate } from 'moment';

export default class Teacher extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const teacher = this.props.teacher;
    const isDetail = this.props.type === 'detail';
    const introductionShort = teacher.introduction.length <= 50 ? teacher.introduction : `${teacher.introduction.slice(0, 50)}...`;

    return (
      <div className={this.props.type === 'overall' ? 'Teacher' : 'Teacher Teacher-detail'}>
        <Row type='flex'>
          <Col>
            <aside>
              <div className='App-avatar' style={{backgroundImage: `url(${teacher.avatar})`}} />
              <h4>{isDetail ? '' : teacher.name}</h4>
              <strong>{teacher.cost}/小时</strong>
            </aside>
          </Col>

          <Col style={{flex: 1}}>
            <article>
              <header>
                {
                  teacher.majors.map((major, index) => {
                    return <Tag key={index}>{major}</Tag>
                  })
                }
                <h4>
                  {teacher.school ? <span>{teacher.school}</span> : null}
                  {teacher.degree ? <span>{teacher.degree}</span> : null}
                </h4>
              </header>

              <p>{isDetail ? teacher.introduction : introductionShort}</p>

              <Row type='flex' align='bottom'>
                <Col span={10}>
                  <small>已授课时长: {teacher.sold}小时</small>
                </Col>

                <Col span={14} style={{textAlign: 'right'}}>
                  <Button>留言</Button>
                  <Button type='primary'>预约</Button>
                </Col>
              </Row>
            </article>
          </Col>
        </Row>
      </div>
    )
  }
}
