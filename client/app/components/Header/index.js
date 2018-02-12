import React from 'react';
import { Menu, Button } from 'antd';
import { Route, Link, NavLink } from 'react-router-dom';
import './index.less';
import fn from '../../base/fn.js';

export default class Header extends React.Component {
  state = {
    isLogin: false
  }

  componentDidMount() {
    this.verify();

    window.onhashchange = (e) => {
      this.verify();
    }
  }

  verify = async () => {
    let data = await fn.fetch('/api/user/verify');

    this.setState({
      isLogin: data.code === 200 ? true : false
    });
  }

  logout = async (e) => {
    let result = await fetch('/api/user/logout', {
      credentials: 'include'
    });
  }

  render() {
    const links = [{
      title: '首页',
      href: '/'
    }, {
      title: '寻找老师',
      href: '/teachers'
    }, {
      title: '关于我们',
      href: '/about'
    }];

    return (
      <div className='Header'>
        <div className="App-logo"></div>

        <Menu mode='horizontal' className='Menu'>
          {
            links.map((item, index) => {
              return <Menu.Item key={index}><NavLink to={item.href}>{item.title}</NavLink></Menu.Item>
            })
          }
          {
            this.state.isLogin ? null :
              <Menu.Item style={{float: 'right'}}>
                <Link to='/register'><Button>注册</Button></Link>
              </Menu.Item>
          }
          {
            this.state.isLogin ? null :
              <Menu.Item style={{float: 'right'}}>
                <Link to='/login'><Button>登录</Button></Link>
              </Menu.Item>
          }
          {
            !this.state.isLogin ? null :
              <Menu.Item style={{float: 'right'}}>
                <Button onClick={this.logout}>登出</Button>
              </Menu.Item>
          }
        </Menu>

      </div>
    )
  }
}
