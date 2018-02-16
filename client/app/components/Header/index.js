import React from 'react';
import { Menu, Button, Icon } from 'antd';
import { Route, Link, NavLink } from 'react-router-dom';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const links = [{
      label: '首页', to: '/'
    }, {
      label: '寻找导师', to: '/teachers'
    }, {
      label: '关于我们', to: '/about'
    }];

    const { isLogin } = this.props;

    return (
      <div className='Header'>
        <div className="App-logo"></div>

        <Menu mode='horizontal' style={{lineHeight: '63px', borderBottom: 'none'}}>
          {
            links.map((link, index) => {
              return (
                <Menu.Item key={index}>
                  <Link to={link.to}>{link.label}</Link>
                </Menu.Item>
              )
            })
          }
          {
            isLogin ? null :
              <Menu.Item style={{float: 'right'}}>
                <Link to='/register'><Button>注册</Button></Link>
              </Menu.Item>
          }
          {
            isLogin ? null :
              <Menu.Item style={{float: 'right'}}>
                <Link to='/login'><Button type='primary'>登录</Button></Link>
              </Menu.Item>
          }
          {
            !isLogin ? null :
              <Menu.Item style={{float: 'right'}}>
                <Button onClick={this.props.logout}>登出</Button>
              </Menu.Item>
          }
          {
            !isLogin ? null :
              <Menu.Item style={{float: 'right'}}>
                <Link to='/dashboard'><Button><Icon type='user'/>个人面板</Button></Link>
              </Menu.Item>
          }
        </Menu>
      </div>
    )
  }
}
