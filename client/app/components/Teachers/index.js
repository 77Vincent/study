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
    expand: false,
    loading: true,
    teachers: []
  }

  openTeacher = (e) => {
    return () => {
      console.log(e)
    }
  }

  handleOk = (e) => {
    this.setState({
      expand: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      expand: false,
    });
  }

  render() {
    const domain = this.constructor.name;

    // Simulate getting data from server
    const teachers = [];
    for (let i=0; i<10; i++) {
      teachers.push(((i) => {
        return {
          name: 'Vincent Wen',
          id: i,
          last_active: '2018/01/01',
          cost: 300,
          photo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517943229853&di=9a0ed432b8c531eac245ccb293c47894&imgtype=0&src=http%3A%2F%2Fimg.duoziwang.com%2F2017%2F08%2F10239173757.jpg',
          majors: ['建筑', '景观'],
          introduction: '金吉列留学，国内出国留学咨询服务机构，涵盖出国留学，签证移民等频道，提供全方位的美国留学，加拿大留...'
        };
      })(i));
    }
    setTimeout(() => {
      this.setState({
        teachers,
        loading: false
      })
    }, 500);

    return (
      <div className={domain}>
        <Modal
          cancelText='留言'
          width={600}
          okText='预约'
          visible={this.state.expand}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
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
                      <Components.Teacher teacher={teacher} openTeacher={this.openTeacher} />
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