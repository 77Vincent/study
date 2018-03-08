import React from 'react'
import { Menu, Button, Icon } from 'antd'
import { Route, Link, NavLink } from 'react-router-dom'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }
  links = [{
    label: '寻找导师', to: '/teachers'
  }, {
    label: '关于我们', to: '/about'
  }]
  render() {

    return (
      <div className='Header'>
        <Menu mode='horizontal' style={{height: '47px', lineHeight: '47px', borderBottom: 'none'}}>
          <Menu.Item>
            <Link to='/'><div className="App-logo">Xfolio</div></Link>
          </Menu.Item>
          {
            this.links.map((link, index) => 
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
