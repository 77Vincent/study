import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { Link } from 'react-router-dom'

class SignIn extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidUpdate = () => {
    if (this.props.user) {
      this.props.history.push('./dashboard')
    }
  }
  componentWillMount = () => {
    if (this.props.user) {
      this.props.history.push('./dashboard')
    }
  }
  signIn = (e) => {
    e.preventDefault()

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.signIn(values)
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
          <Link to='/forgot' style={{float: 'right'}}>忘记密码</Link>

          <Button style={{width: '100%'}} type="primary" htmlType="submit">登录</Button>

          <Link to='/sign-up'><Button style={{width: '100%'}}>立即注册</Button></Link>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(SignIn)