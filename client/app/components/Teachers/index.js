import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Row, Col, Tag, Modal } from 'antd';
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

  expand = (e) => {
    console.log(e)
  }

  render() {
    const domain = this.constructor.name;

    // Simulate getting data from server
    const teachers = [];
    const teacher = {
      name: 'Vincent Wen',
      last_active: '2018/01/01',
      cost: 300,
      photo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517943229853&di=9a0ed432b8c531eac245ccb293c47894&imgtype=0&src=http%3A%2F%2Fimg.duoziwang.com%2F2017%2F08%2F10239173757.jpg',
      majors: ['建筑', '景观'],
      introduction: '金吉列留学，国内出国留学咨询服务机构，涵盖出国留学，签证移民等频道，提供全方位的美国留学，加拿大留...'
    };
    for (let i=0; i<20; i++) {
      teachers.push(teacher);
    }
    setTimeout(() => {
      this.setState({
        teachers,
        loading: false
      })
    }, 500);

    return (
      <div className={domain}>
        <Modal>
          jjjjj
        </Modal>

        <Components.Loading visibility={this.state.loading} />
        <Layout>
          <Layout.Sider width='300' className={`${domain}-Sider`}>
            <div className={`${domain}-filter`}>
            </div>
          </Layout.Sider>

          <Layout.Content className={`${domain}-Content`}>
            <Row gutter={20}>
              {
                this.state.teachers.map((teacher, index) => {
                  return (
                    <Col xl={12} lg={24} key={index}>
                      <div onClick={this.expand} className={`${domain}-teacher App-tile`}>
                        <Row type='flex'>
                          <Col className={`${domain}-profile`}>
                            <img src={teacher.photo} />
                            <h4>{teacher.name}</h4>
                            <strong>{teacher.cost}/小时</strong>
                          </Col>

                          <Col className={`${domain}-info`}>
                            {
                              teacher.majors.map((major, index) => {
                                return <Tag key={index}>{major}</Tag>
                              })
                            }
                            <h5>上次在线：{teacher.last_active}</h5>
                            <p>{teacher.introduction}</p>
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