import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Row, Col, Tag, Icon } from 'antd';
import Components from 'components';
import './index.less';

export default class Teachers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const info = {
      name: 'Vincent',
      type: '学生',
      majors: [ '建筑', '景观' ]
    };

    return (
      <div className='Dashboard'>
        <Layout>
          <Layout.Sider width='300'>
            <div className='Dashboard-sider App-tile'>
              <h4>个人面板<Icon className='Icon' type="edit" /></h4>

              <section>
                <h4>{info.type}：{info.name}</h4>
                <h4>
                  意向专业：
                  {
                    info.majors.map((major, index) => {
                      return <Tag key={index}>{major}</Tag>
                    })
                  }
                </h4>
              </section>
            </div>
          </Layout.Sider>

          <Layout.Content className='Dashboard-Content'>
          </Layout.Content>
        </Layout>
      </div>
    );
  }
}