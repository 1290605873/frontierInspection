import React, { Component } from 'react';
import Header from '../../components/header'
import { Form, Icon, Input, Button, Checkbox} from 'antd';
import './index.less'
import Home from '../home';
import md5 from 'md5';
import Auth from "../../auth";
import cookie from 'react-cookies';
class Login extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
        name:"",
        password:""
    };
  }
  handleSubmit = (e) => {
    e.preventDefault()//阻止页面刷新
    let data = this.props.form.getFieldsValue();
    cookie.save('username',data.name);
    data={name:data.name,password:md5(data.password)}
    let auth = this.props.auth;
    auth.login(data, ()=>{
      this.props.history.push("/home");
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
         <Header></Header>
         <div className="loginParent">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请填写正确账号!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请填写正确密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码"  />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>记住我</Checkbox>
              )}
              <a className="login-form-forgot" href="">忘记密码</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
/* Login.contextTypes = {  
  router: PropTypes.object.isRequired  
};  */ 
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm;
