import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Info, Schedule, Order } from 'components';
import './index.less';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props)
    if (!this.props.isLogin) {
      this.props.history.push('./login')
    }
  }

  render() {
    return (
      <div className='Dashboard'>
        <Layout>
          <Layout.Sider width='300' className='Dashboard-sider App-tile'>
            <Menu mode="inline" defaultSelectedKeys={['1']} style={{ borderRight: 0 }}>
              <Menu.Item key='1'><Link to='/dashboard'>基本信息</Link></Menu.Item>
              <Menu.Item key='2'><Link to='/dashboard/schedule'>我的课程</Link></Menu.Item>
              <Menu.Item key='3'><Link to='/dashboard/order'>我的订单</Link></Menu.Item>
            </Menu>
          </Layout.Sider>

          <Layout.Content className='Dashboard-Content App-tile'>
            <Route exact path="/dashboard" component={Info} />
            <Route path="/dashboard/schedule" component={Schedule} />
            <Route path="/dashboard/order" component={Order} />
          </Layout.Content>
        </Layout>
      </div>
    );
  }
}