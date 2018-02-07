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
    const domain = this.constructor.name;
    const teacher = this.props.teacher;
    const isDetail = this.props.type === 'detail';
    const introductionShort = teacher.introduction.length <= 50 ? teacher.introduction : `${teacher.introduction.slice(0, 50)}...`;

    return (
      <div className={this.props.type === 'overall' ? domain : `${domain} ${domain}-detail`}>
        <Row type='flex'>
          <Col className={`${domain}-profile`}>
            <img src={teacher.avatar} />
            <h4>{isDetail ? '' : teacher.name}</h4>
            <strong>{teacher.cost}/小时</strong>
          </Col>

          <Col className={`${domain}-info`}>
            {
              teacher.majors.map((major, index) => {
                return <Tag key={index}>{major}</Tag>
              })
            }
            <h5>上次在线：{teacher.last_active}</h5>
            <p>{isDetail ? teacher.introduction : introductionShort}</p>

            <section>
              <Button type='primary'>预约</Button>
              <Button>留言</Button>
            </section>
          </Col>
        </Row>
      </div>
    )
  }
}
