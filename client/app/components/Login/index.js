import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { Loading } from 'components';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    loading: false
  }

  componentWillMount = () => {
    if (this.props.isLogin) {
      console.log(this)
    }
  }

  login = (e) => {
    e.preventDefault();

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          loading: true
        });

        let res = await fetch('/api/user/login', {
          method:"POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            name: values.userName,
            password: values.password 
          })
        });

        if (res.status === 200) {
          this.props.login();
          this.setState({
            loading: false
          });
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Loading loading={this.state.loading}>
        <Form onSubmit={this.login} style={{maxWidth: '300px', margin: '0 auto'}}>
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

            <Link to='/forgot' style={{float: 'right'}}>忘记密码</Link>

            <Button style={{width: '100%'}} type="primary" htmlType="submit">登录</Button>
            <Link to='/register'><Button style={{width: '100%'}}>现在注册</Button></Link>
          </Form.Item>
        </Form>
      </Loading>
    );
  }
}

export default Form.create()(Login);