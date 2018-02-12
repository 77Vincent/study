import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';

class Login extends React.Component {
  handleSubmit = async(e) => {
    e.preventDefault();
    // await fetch('/api/user/login',{
    //   method:"POST",
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   credentials: 'include',
    //   body: JSON.stringify({
    //     name: 'edguan1',
    //     password: '123456'
    //   })
    // })

    await fetch('/api/user/verify',{
      credentials: 'include'
    })

    // await fetch('/api/user/logout',{
    //   credentials: 'include'
    // })
    
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className='Login'>
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入电子邮箱' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='电子邮箱' />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
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

          <section>
            <Link to='/forgot'>忘记密码</Link>
          </section>

          <Button type="primary" htmlType="submit">登录</Button>
          <Link to='/register'><Button>现在注册</Button></Link>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(Login);