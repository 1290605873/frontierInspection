import React, { Component } from 'react';
import {Layout} from 'antd';
import Menunav from './components/menu';
import Header from './components/header';
import './style/common.less'
const { Content, Sider } = Layout;


class Admin extends Component {
  render() {
    return (
      <div >
        <Layout>
          <Header></Header>
          <Layout>
            <Sider width={150}  theme="dark">
              <Menunav></Menunav>
            </Sider>
            <Content className="contentDiv">
               {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Admin;
