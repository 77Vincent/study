import React from 'react'
import { Radio, Form, Input, Tag, Icon, Button } from 'antd'
import { userUpdate } from '../../utili'
import './index.less'

class Info extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    isEdit: false
  }
  edit = () => {
    this.setState({
      isEdit: true
    })
  }
  submit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.setLoading(true)
        values.username = this.props.user.username
        const res = await userUpdate(values)
        if (res.status === 200) {
          const data = await res.json()
          this.props.setUser(data)
        } else if (res.status === 500) {
          message.warning('网络连接失败，请稍后再试')
        }
        this.props.setLoading(false)
      }
    })
  }
  render() {
    const user = this.props.user
    const isEdit = this.state.isEdit
    const { getFieldDecorator } = this.props.form

    return (
      <div className='Info'>
        {
          // Return nothing when user data has not been fetch yet
          // to prevent error from getting properties from null
          user &&
            <Form onSubmit={this.submit}>
              <hgroup>
                {
                  isEdit ? 
                    <Form.Item className='Info-Form'>
                      {getFieldDecorator('name', {
                        rules: [{ max: 5, message: '不能超过5个字符' }],
                        initialValue: user.name
                      })(
                        <Input type="text" placeholder='站内对外显示的名称' />
                      )}
                    </Form.Item> : <h2>{user.name}</h2>
                }
                {
                  isEdit ? null : <Icon type='form' onClick={this.edit}/>
                }
                <h3>{user.certified && '认证老师'}</h3>
              </hgroup>
              <section>
                <h4>简介</h4>
                {
                  isEdit ? 
                    <Form.Item className='Info-Form'>
                      {getFieldDecorator('bio', {
                        rules: [{ max: 100, message: '不能超过100个字符' }],
                        initialValue: user.bio
                      })(
                        <Input.TextArea rows={5} />
                      )}
                    </Form.Item> : <span>{user.bio}</span>
                }
              </section>
              <section>
                <h4>学校</h4>
                {
                  isEdit ? 
                    <Form.Item className='Info-Form'>
                      {getFieldDecorator('school', {
                        rules: [{ max: 12, message: '不能超过12个字符' }],
                        initialValue: user.school
                      })(
                        <Input type="text" />
                      )}
                    </Form.Item> : <span>{user.school}</span>
                }
              </section>
              <section>
                <h4>职位</h4>
                {
                  isEdit ? 
                    <Form.Item className='Info-Form'>
                      {getFieldDecorator('title', {
                        rules: [{ max: 12, message: '不能超过12个字符' }],
                        initialValue: user.title
                      })(
                        <Input type="text" />
                      )}
                    </Form.Item> : <span>{user.title}</span>
                }
              </section>
              <section>
                <h4>性别</h4>
                {
                  isEdit ? 
                    <Form.Item className='Info-Form'>
                      <Radio.Group>
                        <Radio value={true}>先生</Radio>
                        <Radio value={false}>女士</Radio>
                      </Radio.Group>
                    </Form.Item> : <span>{user.gender ? '先生' : '女士'}</span>
                }
              </section>
              {
                isEdit &&
                  <Button type='primary' style={{width: '300px'}} htmlType="submit">确认</Button>
              }
            </Form>
        }
      </div>
    )
  }
}

export default Form.create()(Info)