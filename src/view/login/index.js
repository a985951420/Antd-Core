import React from "react";
import {
  Layout,
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Typography,
  message,
} from "antd";
import "./index.css";
import HttpClient from "../../api/httpClient";
import { ConfigUrls } from "../../api/apiConfig";
import { SetStorage, RemoveStorage, GetStorage } from "../../tools/tools";
const { Content } = Layout;
const { Title } = Typography;

const LoginConfig = {
  Login_USERNAME: "username",
  Login_PASSWORD: "password",
  Login_REMEMBER: "remember",
  TOKEN: "token",
};

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: GetStorage(LoginConfig.Login_USERNAME),
    };
  }
  handleSubmit(e) {
    this.setState({ loading: true });
    e.preventDefault();
    var isnext = false;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        isnext = true;
      } else {
        this.setState({ loading: false });
      }
    });
    if (!isnext) return;
    var rememberMe = this.props.form.getFieldValue(LoginConfig.Login_REMEMBER);
    var model = {
      username: this.props.form.getFieldValue(LoginConfig.Login_USERNAME),
      password: this.props.form.getFieldValue(LoginConfig.Login_PASSWORD),
    };
    try {
      HttpClient.post(ConfigUrls.account.login, model).then((response) => {
        if (response.success) {
          SetStorage(LoginConfig.TOKEN, response.data);
          if (rememberMe) {
            SetStorage(LoginConfig.Login_USERNAME, model.username);
          } else {
            RemoveStorage(LoginConfig.Login_USERNAME);
          }
          message.success(response.message);
          this.props.history.push("/");
        } else {
          this.setState({ loading: false });
          this.props.form.setFields({
            password: {
              errors: [new Error(response.message)],
            },
          });
          this.props.form.resetFields("password");
        }
      });
    } catch {
      this.setState({ loading: false });
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    let checked = false;
    let name = this.state.name;
    if (
      name != null &&
      name != undefined &&
      name != "" &&
      name != "undefined"
    ) {
      checked = true;
    } else {
      name = "";
    }
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Content>
          <div className="contentDiv">
            <Title level={2}>Email-登录</Title>
            <Form
              onSubmit={this.handleSubmit.bind(this)}
              className="login-form"
            >
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [{ required: true, message: "请输入用户名!" }],
                  initialValue: name,
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="登录名"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "请输入密码!" }],
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="密码"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("remember", {
                  valuePropName: "checked",
                  initialValue: checked,
                })(<Checkbox>记住我</Checkbox>)}
                <a className="login-form-forgot" href="">
                  忘记密码！
                </a>
                <Button
                  type="primary"
                  loading={this.state.loading}
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
                Or{"   "}
                <a href="">注册!</a>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

export default WrappedNormalLoginForm;
