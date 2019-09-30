import React from 'react';
import { Layout, Menu, Avatar, Icon } from 'antd';
import { RemoveStorage } from '../../../tools/tools'
import { createBrowserHistory as createHistory } from 'history'
const history = createHistory();
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
class HeaderBar extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    handleClick(e) {
        this[e.key]();
    }
    logout() {
        RemoveStorage('token');
        debugger;
        history.push('/login')
    }
    setting() {
        debugger;
    }
    render() {
        return (
            // { minHeight: '100vh' }
            <Header style={{ background: '#fff', textAlign: 'right', padding: 4, height: '47px' }} >
                <Menu mode="horizontal">
                    <SubMenu title={<span><Avatar >U</Avatar>&nbsp;&nbsp;账户信息</span>}>
                        <Menu.Item key="setting" onClick={this.handleClick.bind(this)}><Icon type="setting" />设置</Menu.Item>
                        <Menu.Item key="logout" onClick={this.handleClick.bind(this)}><Icon type="logout" />退出</Menu.Item>
                    </SubMenu>
                </Menu>
            </Header>
        );
    }
}

export default HeaderBar;