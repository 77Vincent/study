import React from 'react'
import { Route, Link } from 'react-router-dom'
import { Layout, Menu, Button } from 'antd'
import { Info, Schedule, Order } from 'components'
import './index.less'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount = () => {
    if (!this.props.user) {
      this.props.history.push('./sign-in')
    }
  }
  componentDidUpdate = () => {
    if (!this.props.user) {
      this.props.history.push('./sign-in')
    }
  }
  render() {
    return (
      <div className='Dashboard'>
        <Layout>
          <Layout.Sider width='210' className='Dashboard-Sider'>
            <Menu mode="inline" defaultSelectedKeys={['1']} style={{ borderRight: 0 }}>
              <Menu.Item key='1'><Link to='/dashboard'>基本信息</Link></Menu.Item>
              <Menu.Item key='2'><Link to='/dashboard/schedule'>我的课程</Link></Menu.Item>
              <Menu.Item key='3'><Link to='/dashboard/order'>我的订单</Link></Menu.Item>
            </Menu>
            <Button onClick={this.props.signOut}>退出登录</Button>
            <Button onClick={this.props.logout}>注销账户</Button>
          </Layout.Sider>

          <Layout.Content className='Dashboard-Content'>
            <Route exact path="/dashboard" render={props => <Info 
              user={this.props.user} 
              {...props} />} 
            />
            <Route path="/dashboard/schedule" component={Schedule} />
            <Route path="/dashboard/order" component={Order} />
          </Layout.Content>
        </Layout>
      </div>
    )
  }
}