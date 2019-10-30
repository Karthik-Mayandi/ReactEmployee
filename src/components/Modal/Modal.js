import React from 'react';
import { Modal, Button } from 'antd';

class MyModal extends React.Component {
    constructor(props){
        super(props)
        console.log("iammm");
      
        
    }
  state = { visible: false };

  componentWillMount() {
      this.showModal();

  }


  showModal = () => {
      console.log(this.state);
      
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        {/* <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button> */}
        <Modal
          title="Basic Modal"
          visible={this.props.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default MyModal;