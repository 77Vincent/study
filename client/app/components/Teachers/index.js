import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Row, Col, Tag, Spin } from 'antd';
import Components from 'components';
import './index.less';

export default class Teachers extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    loading: true,
    teachers: []
  }

  render() {
    const domain = this.constructor.name;

    // Simulate getting data from server
    const teachers = [];
    const teacher = {
      name: 'Vincent Wen',
      last_active: '2018/01/01',
      cost: 300,
      majors: ['建筑', '景观'],
      introduction: '金吉列留学，国内出国留学咨询服务机构，涵盖出国留学，签证移民等频道，提供全方位的美国留学，加拿大留学和英国留学等各国最全面的留学费用。'
    };
    for (let i=0; i<20; i++) {
      teachers.push(teacher);
    }
    setTimeout(() => {
      this.setState({
        teachers,
        loading: false
      })
    }, 1000);

    return (
      <div className={domain}>
        <Layout>
          <Layout.Sider width='300' className={`${domain}-Sider`}>
          </Layout.Sider>

          <Layout.Content className={`${domain}-Content`}>
            <Row gutter={20}>
              {
                this.state.teachers.map((teacher, index) => {
                  return (
                    <Col span='12' key={index}>
                      <div className={`${domain}-teacher App-tile`}>
                        <Row type='flex'>
                          <Col className={`${domain}-profile`}>
                            <div className='placeholder-img'></div>
                            <h3>{teacher.name}</h3>
                            <strong>{teacher.cost}/小时</strong>
                          </Col>

                          <Col className={`${domain}-info`}>
                            {
                              teacher.majors.map((major, index) => {
                                return <Tag key={index}>{major}</Tag>
                              })
                            }
                            <p className={`${domain}-active`}>上次在线：{teacher.last_active}</p>
                            <p className={`${domain}-intro`}>{teacher.introduction}</p>
                            <Button type='primary'>预约</Button>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  )
                })
              }
            </Row>
          </Layout.Content>
        </Layout>
      </div>
    );
  }
}