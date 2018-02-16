import React from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Radio, Modal } from 'antd'

class Register extends React.Component {
  state = {
    expand: false,
    confirmDirty: false,
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
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
      expand: true
    })
  }
  closeProvision = (e) => {
    this.setState({
      expand: false,
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

    return (
      <Form onSubmit={this.handleSubmit} style={{maxWidth: '450px', margin: '0 auto'}}>
        <Modal
          title='服务条款'
          footer={null}
          width={800}
          visible={this.state.expand}
          onCancel={this.closeProvision}
        >
          ...
        </Modal>

        <Form.Item {...formItemLayout} label="用户类别">
          {getFieldDecorator('radio-group', {
            rules: [{
              required: true, message: '请选择用户类别'
            }]
          })(
            <Radio.Group>
              <Radio value="a">学生</Radio>
              <Radio value="b">老师</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="电子邮箱">
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '不符合电子邮箱格式',
            }, {
              required: true, message: '请输入电子邮箱',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="确认密码"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请再次输入密码',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="验证码"
          extra="以验证是真人操作"
        >
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
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button style={{width: '100%'}} type="primary" htmlType="submit">注册</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(Register)