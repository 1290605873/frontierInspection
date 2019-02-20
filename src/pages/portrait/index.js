import React, { Component } from 'react';
import { Row,Col,Checkbox} from 'antd';
import UploadImg from '../../components/upload';
import './index.less'
function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}
class Portrait extends Component {
  render() {
    return (
      <div className="Portrait">
        <Row>
         <Col span={12}><h2>选择具体人像库</h2></Col>
         <Col span={12}>
          <div className="PortraitDate">
            <Checkbox onChange={onChange} defaultChecked>局部重点人员库</Checkbox>
            <Checkbox onChange={onChange} defaultChecked>本地重点人员库</Checkbox>
          </div>
         </Col>
      </Row>
      <Row>
      <div className="PortraitUp">
            <UploadImg></UploadImg>
         </div>
      </Row>
      </div>
      
    );
  }
}
export default Portrait;
