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
    const teachers = [
      {
        name: '王尼玛',
        id: 0,
        last_active: '2018/01/01',
        sold: 2,
        school: '蓝翔技校',
        degree: '挖掘机博士',
        cost: 300,
        avatar: 'http://img3.yxlady.com/yl/UploadFiles_5361/20130312/20130312003913871.jpg',
        majors: ['建筑', '景观'],
        introduction: '留学，旧称留洋，一般是指一个人出国或出境接受各类教育，时间可以为短期或长期（从几个星期到几年）。这些人被称为“留学生”。 另外，美国等国家组织的一类海外短期的交换学生计划，其英文名字“Study abroad”直译也为留学，又称为海外研修（中国大陆、港澳称为“海外交流”）。'
      },
      {
        name: '王大宝',
        id: 1,
        last_active: '2018/02/09',
        sold: 4,
        school: '新东方烹饪学校',
        degree: '摆盘专业硕士',
        cost: 250,
        avatar: 'http://a1.att.hudong.com/10/95/19300359625754132776956495105.jpg',
        majors: ['室内'],
        introduction: '烹饪指的是膳食的艺术，是一种复杂而有规律的将食材转化为食物的加工过程。是对食材加工处理，使食物更可口，更好看，更好闻的处理方式与方法。一道美味佳肴，必然色香味意形养俱佳，不但让人在食用时感到满足，而且能让食物的营养更容易被人体吸收。另外日语中有烹饪一义的“料理”一词也常在台湾被使用。'
      },
      {
        name: '赵日天',
        id: 2,
        last_active: '2017/05/11',
        sold: 1,
        school: '哈佛大学',
        degree: '摄影专业博士后',
        cost: 350,
        avatar: 'https://tse2-mm.cn.bing.net/th?id=OIP.dPir_9YtuhaGxUwswmcsgAHaI9&p=0&o=5&pid=1.1',
        majors: ['服装设计'],
        introduction: '两字一起的意思是”以光线绘图”。摄影是指使用某种专门设备进行影像记录的过程，一般我们使用机械照相机或者数码照相机进行摄影。有时摄影也会被称为照相，也就是通过物体所反射的光线'
      }
    ];
    setTimeout(() => {
      this.setState({
        teachers,
        loading: false
      });
    }, 500);
  }

  render() {
    return (
      <div className='Teachers'>
        <Modal
          title={this.state.teacher.name}
          footer={null}
          width={800}
          visible={this.state.expand}
          onCancel={this.handleCancel}
        >
          <Components.Teacher type='detail' teacher={this.state.teacher} />
        </Modal>

        <Components.Loading visibility={this.state.loading} />

        <Layout>
          <Layout.Sider width='300'>
            <Components.Filter />
          </Layout.Sider>

          <Layout.Content className='Teachers-Content'>
            <Row>
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