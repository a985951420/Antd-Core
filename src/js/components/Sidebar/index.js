import React from 'react';
import { Layout, Menu } from 'antd';
const { SubMenu } = Menu;
const { Sider } = Layout;
/**
 * 定义sidebar组件
 */
class Sidebar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectKey: [],
            openKeys: [],
            mode: 'inline',
            items: this.props.menu
        }
    }
    onCollapse(e) {
        this.props.onCollapse(e);
    }
    onMenuClick(e) {
        this.props.onMenuClick(e.key);
    }
    render() {
        let collapsed = this.props.collapsed;
        let selectKey = this.state.selectKey;
        let openKeys = this.state.openKeys;
        let mode = this.state.mode;
        let menu = this.state.items;
        return (
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse.bind(this)}>
                <div className="logo" />
                <Menu theme="dark" onClick={this.onMenuClick.bind(this)}
                    defaultSelectedKeys={selectKey}
                    mode={mode}
                    defaultOpenKeys={openKeys}>
                    {
                        menu.map(item => {
                            if (item.childNode != undefined || item.childNode != null) {
                                return (
                                    <SubMenu
                                        key={item.id}
                                        title={
                                            <span>
                                                <span>{item.name}</span>
                                            </span>
                                        }>
                                        {
                                            item.childNode.map(subitem => {
                                                return (
                                                    <Menu.Item key={subitem.id}>{subitem.name}</Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                )
                            } else {
                                return (
                                    <Menu.Item key={item.id}>
                                        <span>{item.name}</span>
                                    </Menu.Item>
                                )
                            }
                        })
                    }
                </Menu>
            </Sider>
        );
    }
}

export default Sidebar;