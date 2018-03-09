import React from 'react'
import { message, Form, Icon, Input, Button, Checkbox } from 'antd'
import { Link } from 'react-router-dom'
import { signIn } from '../../utili/user'

class SignIn extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidUpdate = () => {
    if (this.props.user) {
      this.props.history.push('./dashboard')
    }
  }
  signIn = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.loading()
        const res = await signIn(values)
        if (res.status === 200) {
          const result = await res.json()
          this.props.setUser(result.data)
          this.props.history.push('./dashboard')
        } else if (res.status === 403) {
          message.error('用户名/手机号/密码错误！')
        } else if (res.status === 500) {
          message.warning('网络连接失败，请稍后再试')
        }
        this.props.loaded()
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.signIn} style={{maxWidth: '300px', margin: '0 auto'}}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名/手机号/邮箱' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='用户名/手机号/电子邮箱' />
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
          <Link to='/forgot' style={{float: 'left'}}>忘记密码</Link>
          <Link to='/sign-up' style={{float: 'right'}}>立即注册</Link>

          <Button style={{width: '100%'}} type="primary" htmlType="submit">登录</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(SignIn)