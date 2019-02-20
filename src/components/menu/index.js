import React, { Component } from 'react';
import { Menu } from 'antd';
import { NavLink, withRouter  } from 'react-router-dom'
import './index.less'
/* import MenuConfig from './../../config/menuConfig' */


const Menunav = withRouter(({history}) => {
    return (
        <Menu theme="dark" className="Menunav" mode="inline" defaultSelectedKeys={['/home']} selectedKeys={[history.location.pathname]}>
            <Menu.Item key='/home'><NavLink to='/home'>首页</NavLink></Menu.Item>
            <Menu.Item key='/portrait'><NavLink to='/portrait'>人像检索</NavLink></Menu.Item>
            <Menu.Item key='/alarm'><NavLink to='/alarm'>报警处理</NavLink></Menu.Item>
            <Menu.Item key='/dataSource'><NavLink to='/dataSource'>数据源管理</NavLink></Menu.Item>
            <Menu.Item key='/system'><NavLink to='/system'>系统设置</NavLink></Menu.Item>
        </Menu>
    );
})

export default Menunav;
