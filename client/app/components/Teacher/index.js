import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Row, Col, Tag } from 'antd';
import Components from 'components';
import './index.less';

export default class Teacher extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const domain = this.constructor.name;

    return (
      <div className={`${domain}`}>
        <Row type='flex'>
          <Col className={`${domain}-profile`}>
            <img src={this.props.teacher.photo} />
            <h4>{this.props.teacher.name}</h4>
            <strong>{this.props.teacher.cost}/小时</strong>
          </Col>

          <Col className={`${domain}-info`}>
            {
              this.props.teacher.majors.map((major, index) => {
                return <Tag key={index}>{major}</Tag>
              })
            }
            <h5>上次在线：{this.props.teacher.last_active}</h5>
            <p>{this.props.teacher.introduction}</p>

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
