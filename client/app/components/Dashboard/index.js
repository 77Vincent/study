import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Row, Col, Tag, Icon } from 'antd';
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
      <div className='Dashboard'>
        <Components.Loading visibility={this.state.loading} />

        <Layout>
          <Layout.Sider width='300'>
            {
              user ? 
              <div className='Dashboard-sider App-tile'>
                <h4>个人面板<Icon className='App-icon-button' type="edit" /></h4>
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
                </section>
              </div> : null
            }
          </Layout.Sider>

          <Layout.Content className='Dashboard-Content'>
          </Layout.Content>
        </Layout>
      </div>
    );
  }
}