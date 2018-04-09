import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Radio, Modal } from 'antd'
import { UserUtili } from '../../utili'

class SignUp extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    provisionDialog: false,
    confirmDirty: false,
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
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        this.props.setLoading(true)
        const res = await UserUtili.signUp(values)
        if (res.status === 201) {
          const data = await res.json()
          this.props.setUser(data)
        } else {
          message.warning('网络连接失败，请稍后再试')
        }
        this.props.setLoading(false)
      }
    })
  }
  checkUserID = async (rule, value, callback) => {
    if (!value || value[0] === ' ') { return }
    const res = await window.fetch(`/api/users/${value}`)
    if (res.status === 200) {
      callback('已被注册')
    } else {
      callback()
    }
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致')
    } else {
      callback()
    }
  }
  setProvision = (boolean) => {
    return () => this.setState({ provisionDialog: boolean })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
      wrapperCol: { xs: { span: 24 }, sm: { span: 16 }, },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0, },
        sm: { span: 16, offset: 8, },
      },
    }
    return (
      <Form onSubmit={this.submit} style={{maxWidth: '450px', margin: '0 auto'}}>
        <Modal
          title='服务条款'
          footer={null}
          width={800}
          visible={this.state.provisionDialog}
          onCancel={this.setProvision(false)}
        >
          ...
        </Modal>

        <Form.Item {...formItemLayout} label="怎么称呼">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '怎么称呼你呢？' }],
          })(
            <Input type="text" placeholder='用于对外显示的名字'/>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="手机号">
          {getFieldDecorator('mobilephone', {
            rules: [
              { required: true, message: '请输入手机号' },
              { whitespace: true, message: '不能包含空格' },
              { validator: this.checkUserID }
            ],
          })(
            <Input />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="密码">
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入密码', }, 
              { min: 6, message: '不少于6个字符', }, 
             ],
          })( <Input type="password"/>)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="验证码">
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: '请填写您收到的验证码' }],
              })(
                <Input />
              )}
            </Col>
            <Col span={12}>
              <Button>获取验证码</Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            rules: [{ required: true, message: '请阅读服务协议' }],
            valuePropName: 'checked',
          })(
            <Checkbox>我已经阅读<a onClick={this.setProvision(true)}>服务协议</a></Checkbox>
          )}

          <Button style={{width: '100%'}} type="primary" htmlType="submit">注册</Button>
          <Link to='/sign-in' style={{float: 'right'}}>已有账号？立即登录</Link>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(SignUp)