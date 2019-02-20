import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import {Row,Col, Icon } from 'antd';
import logo from './YITU_Logo.png';
import './index.less'
import '../../public/js/main'
import cookie from 'react-cookies';
import axios from 'axios';
import urlList from '../../config';
class Header extends Component {
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
        };
      }
  state={}
    componentWillMount(){
        this.setState({
            userName:cookie.load('username')
        })
    }
    onEsc = (e) => {
       // this.props.history.push("/login");
        /* axios.get(urlList.url+'/logout').then((res) => {
           console.log(res)

       }) */
      }
  render() {
    let userMessage;
    if (cookie.load('username')) {
    userMessage = (
        <div>
             <span>设置<Icon type="bell" theme="filled" /></span>
                    <span>欢迎,{this.state.userName}</span>
                    <span><a href="#" onClick={this.onEsc}>退出</a></span>
        </div>
    )
    }
    return (
        <div className="header">
            <Row>
                <Col span={10} className="logo">
                    <img  src={logo} alt="依图"/>
                    <span>新安防 真智能</span>
                </Col>
                <Col span={4} className="headerName">依图人像盒子</Col>
                <Col span={10} className="weather">
                   {userMessage}
                </Col>
            </Row>
        </div>
    );
  }
}

export default withRouter(Header);
