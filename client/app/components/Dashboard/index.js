import React from 'react'
import { Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import { Info, Schedule, Order, Account } from 'components'
import { signOut } from '../../utili'
import './index.less'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount = () => {
    if (!this.props.user) {
      this.props.history.push('/sign-in')
    }
  }
  componentDidUpdate = () => {
    if (!this.props.user) {
      this.props.history.push('/sign-in')
    }
  }
  submitSignOut = async () => {
    this.props.setLoading(true)
    const res = await signOut()
    if (res.status === 200) {
      this.props.setUser()
    }
    this.props.setLoading(false)
  }
  render() {
    return (
      <div className='Dashboard'>
        <Layout>
          <Layout.Sider width='210' className='Dashboard-Sider'>
            <Menu mode="vertical" defaultSelectedKeys={['1']} style={{ borderRight: 0 }}>
              <Menu.Item key='1'><Link to='/dashboard'><Icon type='user' />基本信息</Link></Menu.Item>
              <Menu.Item key='2'><Link to='/dashboard/schedule'><Icon type='calendar' />我的课程</Link></Menu.Item>
              <Menu.Item key='3'><Link to='/dashboard/order'><Icon type='bank' />我的订单</Link></Menu.Item>
              <Menu.Item key='4'><Link to='/dashboard/account'><Icon type='setting' />账户设置</Link></Menu.Item>
              <Menu.Item key='5' ><div onClick={this.submitSignOut}><Icon type='logout' />退出登录</div></Menu.Item>
            </Menu>
          </Layout.Sider>

          <Layout.Content className='Dashboard-Content'>
            <Route exact path="/dashboard" render={props => <Info 
              user={this.props.user} 
              {...props} />} 
            />
            <Route path="/dashboard/schedule" component={Schedule} />
            <Route path="/dashboard/order" component={Order} />
            <Route path="/dashboard/account" render={props => <Account 
              {...props} />} 
            />
          </Layout.Content>
        </Layout>
      </div>
    )
  }
}