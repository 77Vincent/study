import React from 'react'
import { Menu, Button, Icon } from 'antd'
import { Route, Link, NavLink } from 'react-router-dom'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const links = [{
      label: '首页', to: '/'
    }, {
      label: '寻找导师', to: '/teachers'
    }, {
      label: '关于我们', to: '/about'
    }]

    return (
      <div className='Header'>
        <div className="App-logo"></div>

        <Menu mode='horizontal' style={{lineHeight: '47px', borderBottom: 'none'}}>
          {
            links.map((link, index) => 
              (
                <Menu.Item key={index}>
                  <Link to={link.to}>{link.label}</Link>
                </Menu.Item>
              )
            )
          }

          <Menu.Item style={{float: 'right'}}>
            <Link to='/dashboard'>
              <Icon type='user' style={{fontSize: '1.2em'}} />
              {this.props.user ? this.props.user.name : '未登录'}
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
