import React from 'react'
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Home from './pages/home';
import Portrait from './pages/portrait';
import Alarm from './pages/alarm';
import DataSource from './pages/dataSource';
import System from './pages/system';
import Auth from "./auth";

let  auth = new Auth(); //初始化一个全局的Auth对象


export default class ERouter extends React.Component{

    render(){
        return (
            <HashRouter>
                <App>
                    <Switch>
                        {/* <Route path="/login" component={Login}/> */}
                        <Route  path="/login" render={(props)=>{
                            return <Login auth={auth} {...props} />
                        }} />
                        <Route path="/" render={()=>
                            <Admin>
                                <Switch>
                                    <Route exact path="/" render={(props)=>{
                                        if (auth.isLogin){
                                            return <Home {...props} />
                                        }else{
                                            return <Redirect to="/login"/>
                                        }
                                    }} />
                                    <Route path='/home' component={Home} />
                                    <Route path='/portrait' component={Portrait} />
                                    <Route path='/alarm' component={Alarm} />
                                    <Route path='/dataSource' component={DataSource} />
                                    <Route path='/system' component={System} />
                                     {/* <Redirect to="/home" /> */}
                                </Switch>
                            </Admin>         
                        } />
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}