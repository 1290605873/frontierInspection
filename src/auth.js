import urlList from './config';
import axios from 'axios';
import cookie from 'react-cookies'
//用户登录权限类
export  default class Auth{
    constructor(){
        if(cookie.load('session_id')){
            this.isLogin = true; //是否登录
        }else{
            this.isLogin = false; //是否登录
        }
        
    }

    // 用户登录函数
    login(data, callback){
        axios.post(urlList.url+'/login',data).then((res) => {
            if(res.data.rtn=='0'){
                cookie.save('session_id', res.data.session_id);
                this.isLogin = true;
                callback(); //登录成功，调用回调函数
            }else{
                alert('账号或密码错误')
            }
           
       })
    }
}