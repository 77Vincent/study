import React from 'react'
import { Checkbox, Radio, Form, Input, Tag, Icon, Button } from 'antd'
import { UserUtili } from '../../utili'
import './index.less'

class Info extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    isEdit: false
  }
  setEdit = (boolean) => {
    return () => {
      this.setState({ isEdit: boolean })
    }
  }
  submit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.setLoading(true)
        values.id = this.props.user.id
        const res = await UserUtili.userUpdate(values)
        if (res.status === 200) {
          const data = await res.json()
          this.props.setUser(data)
        } else if (res.status === 500) {
          message.warning('网络连接失败，请稍后再试')
        }
        this.props.setLoading(false)
        this.setState({ isEdit: false })
      }
    })
  }
  field = (value) => {
    if (value) {
      return <span>{value}</span>
    } else {
      return <span style={{opacity: 0.3}}>未填写</span>
    }
  }
  render() {
    const user = this.props.user
    const majorsList = this.props.majors && this.props.majors.map(major => {
      return { label: major.label, value: major.id }
    })
    const { getFieldDecorator } = this.props.form

    return (
      <div className='Info'>
        {
          // Return nothing when user data has not been fetch yet
          // to prevent error from getting properties from null
          user && majorsList &&
            <Form onSubmit={this.submit}>
              <section>
                <h4>用户名</h4>
                {
                  <Form.Item className='Info-Form'>
                    {getFieldDecorator('username', {
                      rules: [{ max: 20, message: '不能超过20个字符' }],
                      initialValue: user.username
                    })( <Input type="text" />)}
                  </Form.Item>
                }
              </section>
              {
                this.state.isEdit &&
                  <footer>
                    <Button type='primary' htmlType="submit">确认</Button>
                    <Button onClick={this.setEdit(false)}>取消</Button>
                  </footer>
              }
            </Form>
        }
      </div>
    )
  }
}

export default Form.create()(Info)