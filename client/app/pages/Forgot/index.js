import React from 'react'
import { Button, Form, Icon, Input } from 'antd'
import { Link } from 'react-router-dom'
import './index.less'

class Forgot extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit} className='Forgot'>
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入注册邮箱' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="注册邮箱" />
          )}
        </Form.Item>

        <Form.Item>
          <Link to='/sign-in'>返回登录</Link>
          <Button type='primary' htmlType="submit">找回密码</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(Forgot)