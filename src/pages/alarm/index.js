import React, { Component } from 'react';
import { Tabs ,Pagination, Modal} from 'antd';
import SnapContrast from '../../components/snapContrast';
import './index.less'
const TabPane = Tabs.TabPane;
function callback(key) {
  console.log(key);
}
class Alarm extends Component {
  state = { 
    visible: false ,
    dom:""
  }

  showModal = (e) => {
    console.log(e.currentTarget)
    const dom=e.currentTarget
    this.setState({
      visible: true,
      dom
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    console.log(this.state.dom);
    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="实时报警信息" key="1">
            <div className="RealTime">
              <ul className="listImg">
                <li onClick={this.showModal}><SnapContrast ></SnapContrast></li>
                <li onClick={this.showModal}><SnapContrast ></SnapContrast></li>
                <li onClick={this.showModal}><SnapContrast ></SnapContrast></li>
                <li onClick={this.showModal}><SnapContrast ></SnapContrast></li>
                <li onClick={this.showModal}><SnapContrast ></SnapContrast></li>
                <li onClick={this.showModal}><SnapContrast ></SnapContrast></li>
                <li onClick={this.showModal}><SnapContrast ></SnapContrast></li>
                <li onClick={this.showModal}><SnapContrast ></SnapContrast></li>
                <li onClick={this.showModal}><SnapContrast ></SnapContrast></li>
                <li onClick={this.showModal}><SnapContrast ></SnapContrast></li>
             </ul>
             <div className="pagination"><Pagination defaultCurrent={1} total={50}/></div>  
            </div>
            <Modal
              title="Basic Modal"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
               {this.state.dom}
            </Modal>
          </TabPane>
          <TabPane tab="报警统计查询" key="2">
          
          
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default Alarm;
