import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Radio, Modal } from 'antd'
import { signUp, signIn } from '../../utili/user'

class SignUp extends React.Component {
  state = {
    provisionDialog: false,
    confirmDirty: false,
  }
  componentDidMount = () => {
    if (this.props.user) {
      this.props.history.push('./dashboard')
    }
  }
  componentDidUpdate = () => {
    if (this.props.user) {
      this.props.history.push('./dashboard')
    }
  }
  submit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        this.props.loading()
        const res = await signUp(values)
        if (res.status === 200) {
          const res = await signIn(values)
          if (res.status === 200) {
            const result = await res.json()
            this.props.setUser(result.data)
            this.props.history.push('./dashboard')
          }
        }
        this.props.loaded()
      }
    })
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致')
    } else {
      callback()
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }
  openProvision = () => {
    this.setState({
      provisionDialog: true
    })
  }
  closeProvision = (e) => {
    this.setState({
      provisionDialog: false,
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    }
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>
    ) 

    return (
      <Form onSubmit={this.submit} style={{maxWidth: '450px', margin: '0 auto'}}>
        <Modal
          title='服务条款'
          footer={null}
          width={800}
          visible={this.state.provisionDialog}
          onCancel={this.closeProvision}
        >
          ...
        </Modal>

        <Form.Item {...formItemLayout} label="用户类别">
          {getFieldDecorator('role', {
            rules: [{
              required: true, message: '请选择用户类别'
            }]
          })(
            <Radio.Group>
              <Radio value="student">学生</Radio>
              <Radio value="teacher">老师</Radio>
            </Radio.Group>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="用户名">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '用于登录的用户名', }],
          })(
            <Input type="text" />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="手机号">
          {getFieldDecorator('mobilephone', {
            rules: [{ required: true, message: '请输入手机号' }],
          })(
            <Input addonBefore={prefixSelector}/>
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="密码">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码', }, { validator: this.checkConfirm, }],
          })(
            <Input type="password" />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="确认密码">
          {getFieldDecorator('confirm', {
            rules: [{ required: true, message: '请再次输入密码', }, { validator: this.checkPassword, }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
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
            valuePropName: 'checked',
          })(
            <Checkbox>我已经阅读<a onClick={this.openProvision}>协议</a></Checkbox>
          )}

          <Button style={{width: '100%'}} type="primary" htmlType="submit">注册</Button>
          <Link to='/sign-in' style={{float: 'right'}}>已有账号？立即登录</Link>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(SignUp)