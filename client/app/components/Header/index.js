import React from 'react'
import { Menu, Button, Icon } from 'antd'
import { Route, Link, NavLink } from 'react-router-dom'
import './index.less'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }
  links = [{
    label: '寻找导师', to: '/teachers'
  }, {
    label: '关于Xfolio', to: '/about'
  }]
  render() {
    return (
      <div className='Header'>
        <Menu mode='horizontal' className='Menu'>
          <Menu.Item>
            <Link to='/'><div className="App-logo">Xfolio</div></Link>
          </Menu.Item>
          {
            this.links.map((link, index) => 
              (
                <Menu.Item className='Menu-Item' key={index}>
                  <Link to={link.to}>{link.label}</Link>
                </Menu.Item>
              )
            )
          }
          <Menu.Item className='Menu-user'>
            <Link to='/dashboard'>
              <Icon type='user' className='Icon'/>
              {this.props.user ? this.props.user.name : '未登录'}
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
