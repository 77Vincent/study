import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { Button } from 'antd';
import { WSAEINPROGRESS } from 'constants';
import './index.less';

export default class Header extends  Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
  }
  render(){

    const links = [{
      title: 'About us',
      href: '/about'
    }, {
      title: 'News',
      href: '/news'
    }];

    return (
      <div className='Header'>
        <Row>
          <Col span='4'>
            <h1> <Link to='/'>Website Title</Link> </h1>
          </Col>

          <Col span='20' >
            <Row gutter='8' type='flex' align='middle' justify='end'>
              {
                links.map((item, index) => {
                  return (
                    <Col>
                      <NavLink key={index} className='button-bold' activeClassName='toggle' to={item.href}>
                        {item.title}
                      </NavLink>
                    </Col>
                  )
                })
              }
              <Col>
                <Button>Sign in</Button>
              </Col>
              <Col>
                <Button>Sign in</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}