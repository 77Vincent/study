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
    teachers: [],
    teacher: {}
  }

  openTeacher = (teacher_id) => {
    this.setState({
      expand: true,
      teacher: this.state.teachers[teacher_id] 
    });
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

  componentDidMount = () => {
    // Simulate getting data from server
    const teachers = [];
    for (let i=0; i<10; i++) {
      teachers.push(((i) => {
        return {
          name: 'Vincent Wen',
          id: i,
          last_active: '2018/01/01',
          cost: 300,
          avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517943229853&di=9a0ed432b8c531eac245ccb293c47894&imgtype=0&src=http%3A%2F%2Fimg.duoziwang.com%2F2017%2F08%2F10239173757.jpg',
          majors: ['建筑', '景观'],
          introduction: '留学，旧称留洋，一般是指一个人出国或出境接受各类教育，时间可以为短期或长期（从几个星期到几年）。这些人被称为“留学生”。 另外，美国等国家组织的一类海外短期的交换学生计划，其英文名字“Study abroad”直译也为留学，又称为海外研修（中国大陆、港澳称为“海外交流”）。'
        };
      })(i));
    }
    setTimeout(() => {
      this.setState({
        teachers,
        loading: false
      })
    }, 500);
  }

  render() {
    const domain = this.constructor.name;

    return (
      <div className={domain}>
        <Modal
          title={this.state.teacher.name}
          footer={null}
          width={900}
          visible={this.state.expand}
          onCancel={this.handleCancel}
        >
          <Components.Teacher type='detail' teacher={this.state.teacher} />
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
                      <div className='App-tile' onClick={() => this.openTeacher(teacher.id)}>
                        <Components.Teacher type='overall' teacher={teacher} />
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