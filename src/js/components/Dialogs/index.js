import React from 'react';
import { Modal } from 'antd';

class Dialog extends React.Component {
    constructor(props) {
        super();
    }
    handleOk(e) {
        this.props.handleOk(e);
    };
    handleCancel(e) {
        this.props.handleCancel(e);
    };
    render() {
        return (
            <Modal
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
            >
                {this.props.children}
            </Modal>
        );
    }
}

export default Dialog;