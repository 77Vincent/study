import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Row, Col, Tag, Icon, Menu } from 'antd';
import Components from 'components';
import './index.less';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    loading: true,
    user: null 
  }

  expandInfo = () => {

  }

  componentDidMount = () => {
    const user = {
      type: {
        id: 0,
        value: '学生'
      },
      avatar: 'https://tse2-mm.cn.bing.net/th?id=OIP.dPir_9YtuhaGxUwswmcsgAHaI9&p=0&o=5&pid=1.1',
      name: 'Vincent',
      majors: [ '建筑', '景观' ]
    };

    setTimeout(() => {
      this.setState({
        user,
        loading: false
      });
    }, 500);
  }

  render() {
    const user = this.state.user;

    return (
      <div className={this.state.loading ? 'Dashboard App-spinner' : 'Dashboard'}>
        <Layout>
          <Layout.Sider width='300' className='Dashboard-sider App-tile'>
            <Menu 
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key='1'>基本信息</Menu.Item>
              <Menu.Item key='2'>我的课程</Menu.Item>
              <Menu.Item key='3'>我的订单</Menu.Item>
            </Menu>
          </Layout.Sider>

          <Layout.Content className='Dashboard-Content App-tile'>
            {
              user ? 
              <section>
                <div className='App-avatar' style={{backgroundImage: `url(${user.avatar})`}} />
                <h4>{user.type.value}：{user.name}</h4>

                <h4>
                  意向专业：
                  {
                    user.majors.map((major, index) => {
                      return <Tag key={index}>{major}</Tag>
                    })
                  }
                </h4>
              </section> : null
            }
          </Layout.Content>
        </Layout>
      </div>
    );
  }
}