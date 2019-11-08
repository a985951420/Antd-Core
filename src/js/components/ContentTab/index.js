import React from 'react';
import './index.css'
import { Layout, Tabs, Icon, Dropdown, Menu } from 'antd';
const { Content } = Layout;
const TabPane = Tabs.TabPane;
const menuItems = (
    <Menu>
        <Menu.Item>
            <div>关闭当前标签页</div>
        </Menu.Item>
        <Menu.Item>
            <div>关闭其他标签页</div>
        </Menu.Item>
        <Menu.Item>
            <div >关闭全部标签页</div>
        </Menu.Item>
    </Menu>
)
class ContentTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabKey: ""
        };
    }
    onMenuClick(e) {
        this.props.onMenuClick(e);
    }
    onEdit(key, action) {
        debugger;
        this.props.onEdit(key, action);
    }
    onMouseOver(key) {
        if (key === undefined || key === "" || key === null) {
            return;
        }
        setTimeout(() => {
            this.setState({
                tabKey: key
            });
        }, 100);
    }
    render() {
        let activeKey = this.props.activeKey;
        let items = this.props.items;
        return (
            <Content style={{ margin: "10px 0px 0px 0px" }} >
                <Tabs
                    animated={true}
                    activeKey={activeKey}
                    onChange={this.onMenuClick.bind(this)}
                    onEdit={this.onEdit.bind(this)}
                    tabBarStyle={{ backgroundColor: "#fff" }}
                    renderTabBar={(props, DefaultTabBar) => {
                        // 提取tab信息
                        const tabInfo = [];
                        items.forEach(item => {
                            tabInfo.push({
                                key: item.id,
                                title: item.name
                            })
                        });
                        return (
                            <Dropdown overlay={menuItems} trigger={['contextMenu']}>
                                <div className='dropdownpanle'>
                                    {
                                        tabInfo.map((item, index) => (
                                            <div
                                                key={item.key}
                                                onClick={this.onMenuClick.bind(this, item.key)}
                                                onMouseOver={this.onMouseOver.bind(this, item.key)}
                                                onMouseOut={this.onMouseOver.bind(this)}
                                                className={props.activeKey === item.key ? 'activeTab normalTab' : 'normalTab'}
                                            >
                                                <div style={{ padding: 5, cursor: "pointer" }} >
                                                    {item.title}
                                                    &nbsp;&nbsp;&nbsp;
                                                    <span style={{ display: this.state.tabKey == item.key ? "" : "none" }}>
                                                        {/* <Icon spin style={{ fontSize: "10px" }} type="sync" />
                                                        &nbsp;&nbsp; */}
                                                        <span onClick={this.onEdit.bind(this, item.key, 'remove')}><Icon className='iconStyle' type="close" /></span>
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </Dropdown>
                        )
                    }}
                >
                    {
                        items.map(pane => {
                            return (
                                <TabPane
                                    key={pane.id} title={pane.name}>
                                    <div className={'tabPaneContent'}>
                                        {pane.Component}
                                    </div>
                                </TabPane>
                            );
                        })
                    }

                </Tabs>

            </Content >
        );
    }
}

export default ContentTab;


