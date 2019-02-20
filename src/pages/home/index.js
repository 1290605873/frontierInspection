import React, { Component } from 'react';
import {Row,Col, Icon,Button,Menu, Dropdown ,Checkbox } from 'antd';
import axios from 'axios'
import urlList from '../../config';
import SnapContrast from '../../components/snapContrast';
import Img from '../../timg.jpg';
import './index.less'
import Auth from '../../auth';
import cookie from 'react-cookies';
import Axios from '../../axios';
import '../../public/js/main';
import '../../setupProxy'
import _ from 'lodash';
axios.defaults.withCredentials=true;

//camerasid列表
const camerasID=[];
const camerasID1=[];
//布控查询id列表
const taskID=[];

class Home extends Component {
  state = {
    visible: false,
    dataCameras: [],
    menu:{}
  };
  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  }
  onChange = (e) => {
    if(e.target.checked){
      camerasID.push(e.target.value)
    }else{
      _.pull(camerasID,e.target.value)
    }
  }
  componentWillMount(){
      this.setState({
        alarmMum:'0',
      })
      //取集群id
      this.jqidAPIData(); 
      //camera列表
      this.cameraAPIData();
      //布控
      this.taskAPIData();
      //报警信息
      this.AlarmAPIData()
      //抓拍
      this.snappingAPIData();
  } 
  // camera列表
  cameraAPIData(){
    const headers={
      headers: {
        session_id: cookie.load('session_id')
      }
    }
    axios.get(urlList.url+'/camera?predecessor_id=2&depth=3',headers)
      .then((response) => {
        //console.log(response)
        const dataCameras=response.data.cameras;
        if(dataCameras.length>0){
          const menu = (
            <Menu>{
              dataCameras.map((cont,index) =>{
                  return (
                      <Menu.Item key={index}><Checkbox defaultChecked onChange={this.onChange} value={cont.id}>{cont.name}</Checkbox></Menu.Item>
                  )})
          } 
            </Menu>)
            this.setState({ menu })
        }else{
          const menu = (
            <div>
            </div>)
            this.setState({ menu })
        }
        for(var i=0;i<dataCameras.length;i++){
          camerasID.push(parseInt(dataCameras[i].id,  10));
          camerasID1.push(dataCameras[i].id)
        }
      })
      .catch(function (error) {
        console.log(error);
      });  
  }
  //取集群id
  jqidAPIData(){
    const headers={
      headers: {
        session_id: cookie.load('session_id')
      }
    }
    axios.get(urlList.baseUrl+'/p2p/get_self',headers)
      .then((response) => {
        cookie.save('peer_id', response.data.peer_id);
        //实时过人
     this.realtimeAPIData(response.data.peer_id); 
      })
  }
  //实时过人
  realtimeAPIData(id){
    const dataJson={
      'cluster_id':id,
      "fields": ["picture_uri", "face_image_id", "repository_id", "timestamp", "person_id", "name", "gender", "nation", "camera_id"],
      "condition": {
        "camera_id": 
        {
          "$in": [0]
        }
      },
      "limit": 1
    }
    console.log(dataJson)
    const headers={
      headers: {
        session_id: cookie.load('session_id')
      }
    }
    axios.post(urlList.urlOf+'/track/query/realtime',dataJson,headers)
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });  
  }



  // 布控查询
  taskAPIData(){
    const headers={
      headers: {
        session_id: cookie.load('session_id')
      }
    }
    axios.get(urlList.url+'/surveillance/task',headers)
      .then((response) => {
        //console.log(response.data.surveillances);
        const task=response.data.surveillances;
        for(var i=0;i<task.length;i++){
          taskID.push(task[i].id);
        }
        
      })
      .catch(function (error) {
        console.log(error);
      });  
  }

  // 报警信息
  AlarmAPIData(){
    const dataJson={
      "surveillance_ids": taskID,
      "hit_condition": {
        "camera_id": 
        {
          "$in": camerasID
        }
      },
      "limit": 4
  }
  const headers={
    headers: {
      session_id: cookie.load('session_id')
    }
  }
  //console.log(dataJson)
    axios.post(urlList.url+'/hit/alert/realtime', dataJson,headers)
      .then((response) => {
        console.log(response);
        const alarmList=response
        this.setState({ alarmList })
      })
      .catch(function (error) {
        console.log(error);
      });  
  }

  //路人抓拍
  snappingAPIData(){
    const dataJson={
      'cluster_id':cookie.load('peer_id'),
      'fields':["face_image_uri"],
      "condition": {
        "camera_id": 
        {
          "$in": camerasID
        }
      },
      "order": {
        "timestamp": -1
      },
      "start": 0, "limit": 7 
    }
    const headers={
      headers: {
        session_id: cookie.load('session_id')
      }
    }
    axios.post(urlList.urlOf+'/track/query',dataJson,headers)
      .then((response) => {
       // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });  
  }
  render() {
    return (
      <div className="main">
        <Row className="home-top">
          <Col span={14} className="col">
            <Dropdown overlay={this.state.menu} trigger={['click']} onVisibleChange={this.handleVisibleChange}
        visible={this.state.visible}>
              <a className="ant-dropdown-link" href="#">
                设置 <Icon type="down" />
              </a>
            </Dropdown>
            <div className="cameraNew">
              
            </div>
          </Col>
          <Col span={10} className="col">
          <div className="alarmInfo">
            <div className="InfoTit">
               报警信息/今日共报警{this.state.alarmMum}次
               <span>查看全部</span>
            </div>
            <SnapContrast msg={this.state.alarmList}></SnapContrast>
          </div>
          </Col>
        </Row>
        <Row className="home-footer">
          <Col span={24} className="col">
            <div className="InfoTit">
               路人抓拍/共{this.state.alarmMum}次抓拍
            </div>
            <ul className="snapDiv">
               <li><img src={Img}/></li>
               <li><img src={Img}/></li>
               <li><img src={Img}/></li>
               <li><img src={Img}/></li>
               <li><img src={Img}/></li>
               <li><img src={Img}/></li>
               <li><img src={Img}/></li>
            </ul>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Home;
