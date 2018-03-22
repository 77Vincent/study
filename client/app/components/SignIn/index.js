import React from 'react'
import { Button, message, Form, Icon, Input, Checkbox } from 'antd'
import { Link } from 'react-router-dom'
import { UserUtili } from '../../utili'

class SignIn extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount = () => {
    if (this.props.user) {
      this.props.history.push('/dashboard')
    }
  }
  componentDidUpdate = () => {
    if (this.props.user) {
      this.props.history.push('/dashboard')
    }
  }
  submit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.setLoading(true)
        const res = await UserUtili.signIn(values)
        if (res.status === 200) {
          const data = await res.json()
          this.props.setUser(data)
        } else if (res.status === 403) {
          message.error('登录信息错误！')
        } else if (res.status === 500) {
          message.warning('网络连接失败，请稍后再试')
        }
        this.props.setLoading(false)
      }
    })
  }
  message = {
    id: '手机号/电子邮箱/用户名',
    password: '密码'
  }
  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.submit} style={{maxWidth: '300px', margin: '0 auto'}}>
        <Form.Item>
          {getFieldDecorator('id', {
            rules: [{ required: true, message: `请输入${this.message.id}` }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={this.message.id} />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: `请输入${this.message.password}` }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={this.message.password} />
          )}
        </Form.Item>

        <Form.Item>
          <Link to='/forgot' style={{float: 'left'}}>忘记密码</Link>
          <Link to='/sign-up' style={{float: 'right'}}>立即注册</Link>

          <Button type='primary' style={{width: '100%'}} htmlType="submit">登录</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(SignIn)