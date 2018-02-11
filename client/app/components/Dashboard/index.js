import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Row, Col, Tag, Modal } from 'antd';
import Components from 'components';
import './index.less';

export default class Teachers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const info = [
      {
        label: '昵称',
        name: '77'
      },
      {

      }
    ];

    return (
      <div className='Dashboard'>
        <Layout>
          <Layout.Sider width='300' className='Dashboard-Sider'>
            <h3>个人面板</h3>

            {
              info.map((item, index) => {
                return (
                  <div>
                  </div>
                )
              })
            }
          </Layout.Sider>

          <Layout.Content className='Dashboard-Content'>
          </Layout.Content>
        </Layout>
      </div>
    );
  }
}