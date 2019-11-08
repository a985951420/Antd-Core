import React from 'react';
import {
    Form,
    Select,
    Switch,
    Input
} from 'antd';

class AddMenuFrom extends React.Component {
    constructor(props) {
        super(props);
        debugger;
        this.state = {
            id: 0,
            menuName: "",
            viewCode: "",
            menuType: "1",
            remark: "",
            activate: true,
        };
    }
    componentDidMount() {
        var viewcode = this.props.viewCode;
        debugger;
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form >
                <Form.Item label="名称">
                    {getFieldDecorator('menuName', {
                        initialValue: this.state.menuName,
                        rules: [
                            {
                                required: true,
                                message: '请输入菜单名称',
                            },
                        ],
                    })(<Input placeholder="请输入菜单名称" />)}
                </Form.Item>
                <Form.Item label="viewCode">
                    {getFieldDecorator('viewCode', {
                        initialValue: this.state.viewCode,
                        rules: [
                            {
                                required: true,
                                message: '请输入viewCode',
                            },
                        ],
                    })(<Input placeholder="请输入viewCode" />)}
                </Form.Item>
                <Form.Item label="类型">
                    {getFieldDecorator('menuType', {
                        initialValue: this.state.menuType,
                        rules: [{
                            required: true,
                            message: '请选择类型!'
                        }],
                    })(
                        <Select
                            placeholder="请选择">
                            <Option value="1">菜单</Option>
                            <Option value="2">按钮</Option>
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item label="描述">
                    <Input placeholder="请输入描述" defaultValue={this.state.remark} />
                </Form.Item>
                <Form.Item label="是否有效">
                    {getFieldDecorator('activate', { valuePropName: 'checked' })(<Switch />)}
                </Form.Item>
            </Form >
        );
    }
}
const WrappedNormalAddMenuFrom = Form.create({ name: 'ADD_Menu' })(AddMenuFrom);

export default WrappedNormalAddMenuFrom;
