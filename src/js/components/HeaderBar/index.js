import React from 'react';
import { Layout, Menu, Avatar, Icon } from 'antd';
import { RemoveStorage } from '../../../tools/tools'
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick(e) {
        this[e.key](e);
    }
    logout(e) {
        RemoveStorage('token');
        this.props.history.push('/login');
    }
    setting() {
    }
    render() {
        return (
            <Header style={{ background: '#fff', textAlign: 'right', height: '47px', padding: 5 }} >
                <Menu style={{ height: '47px' }} mode="horizontal">
                    <SubMenu title={<span><Avatar >U</Avatar>&nbsp;&nbsp;&nbsp;账户信息</span>}>
                        <Menu.Item key="setting" onClick={this.handleClick.bind(this)}><Icon type="setting" />设置</Menu.Item>
                        <Menu.Item key="logout" onClick={this.handleClick.bind(this)}>
                            <Icon type="logout" />退出
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Header>
        );
    }
}
export default HeaderBar;