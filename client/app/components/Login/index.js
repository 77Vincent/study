import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import fetch from 'isomorphic-fetch';
import './index.less';

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className='Login'>
        <Form onSubmit={this.handleSubmit} className='Login-Form'>
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>
            )}
            <a className='Login-forgot' href="">忘记密码</a>
            <Button type="primary" htmlType="submit" className='Login-Button'>登录</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);