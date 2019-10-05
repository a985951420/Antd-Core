import React from 'react';
import { Layout, Menu, Avatar, Icon } from 'antd';
import { RemoveStorage } from '../../../tools/tools'
import PropTypes from 'prop-types'
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
class HeaderBar extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    handleClick(e) {
        this[e.key](e);
    }
    logout(e) {
        debugger;
        RemoveStorage('token');
        console.log(this.context)
    }
    setting() {
    }
    render() {
        return (
            // { minHeight: '100vh' }
            <Header style={{ background: '#fff', textAlign: 'right', padding: 4, height: '47px' }} >
                <Menu mode="horizontal">
                    <SubMenu title={<span><Avatar >U</Avatar>&nbsp;&nbsp;账户信息</span>}>
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


HeaderBar.contextTypes = {
    router: PropTypes.object.isRequired
}

export default HeaderBar;