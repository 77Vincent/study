import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import fetch from 'isomorphic-fetch';
import './index.less';

class Forgot extends React.Component {
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
      <div className='Forgot'>
        <Form onSubmit={this.handleSubmit} className='Form'>
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入注册邮箱' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="注册邮箱" />
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">找回密码</Button>
            <Button><Link to='/login'>返回登录</Link></Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Forgot);