import React, { Component } from 'react';
import './index.less';
import Img from '../../timg.jpg';

class SnapContrast extends Component {
    
    render() {
       //console.log(this.props.msg)
      return (
        <div className="snap">
            <div className="snapBox">
                <div className="snapImg">
                    <img src={Img}  />
                    <img src={Img}  />
                    <span>98.12</span>
                </div>
                <div className="snapText">
                    <p className="snapTextNane">camera-01</p> 
                    <p>2019/01/01 19:30:30</p>
                    <p>姓名</p> 
                    <p>身份证号</p> 
                </div>
            </div>
            
        </div>
      );
    }
  }
  export default SnapContrast;
