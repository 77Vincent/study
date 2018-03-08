import React from 'react'
import { Route, Link } from 'react-router-dom'
import { Layout, Menu, Button } from 'antd'
import { Info, Schedule, Order } from 'components'

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
          <Layout.Sider width='300' className='Dashboard-sider App-tile'>
            <Menu mode="inline" defaultSelectedKeys={['1']} style={{ borderRight: 0 }}>
              <Menu.Item key='1'><Link to='/dashboard'>基本信息</Link></Menu.Item>
              <Menu.Item key='2'><Link to='/dashboard/schedule'>我的课程</Link></Menu.Item>
              <Menu.Item key='3'><Link to='/dashboard/order'>我的订单</Link></Menu.Item>
            </Menu>
            <Button onClick={this.props.signOut}>登出</Button>
          </Layout.Sider>

          <Layout.Content className='App-tile' style={{maxWidth: '900px'}}>
            <Route path="/dashboard" render={props => <Info 
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