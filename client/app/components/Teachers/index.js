import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';
import './index.less';

export default class Teachers extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const domain = this.constructor.name;
    const teachers = [
      {
        name: 'Vincent',
        last_active: '2018/01/01'
      }
    ]

    return (
      <div className={domain}>
        <Layout>
          <Layout.Sider>
          </Layout.Sider>

          <Layout.Content>
            {
              teachers.map((teacher, index) => {
                return (
                  <div className={`${domain}-teacher App-tile`}>
                    <div className='placeholder-img'></div>
                    
                  </div>
                )
              })
            }
          </Layout.Content>
        </Layout>
      </div>
    );
  }
}