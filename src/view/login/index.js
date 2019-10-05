import React from 'react';
import { Layout, Form, Icon, Input, Button, Checkbox, Typography, message } from 'antd';
import './index.css'
import HttpClient from '../../api/httpClient'
import { longinUrl } from '../../api/apiConfig'
import { SetStorage } from '../../tools/tools'
const { Content } = Layout;
const { Title } = Typography;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit(e) {
    e.preventDefault();
    var isnext = false;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        isnext = true;
      }
    });
    if (!isnext) return;
    var model = {
      username: this.props.form.getFieldValue("username"),
      password: this.props.form.getFieldValue("password")
    }
    HttpClient.post(longinUrl, model).then(response => {
      if (response.success) {
        SetStorage('token', response.data)
        message.success(response.message);
      } else {
        this.props.form.setFields({
          username: {
            errors: [new Error(response.message)],
          },
        });
        this.props.form.resetFields("password");
      }
    });
  };
  componentWillMount() {
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Content>
          <div className='contentDiv'>
            <Title level={2}>Email-登录</Title>
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: false,
                })(<Checkbox>记住我</Checkbox>)}
                <a className="login-form-forgot" href="">
                  忘记密码！
                    </a>
                <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                Or <a href="">注册!</a>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;