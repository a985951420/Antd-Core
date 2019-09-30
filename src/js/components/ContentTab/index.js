import React from 'react';
import { Layout, Tabs } from 'antd';
import User from '../../../view/user/index'
const { Content } = Layout;
const TabPane = Tabs.TabPane;
class ContentTab extends React.Component {
    constructor(props) {
        super(props);

    }
    onMenuClick(e) {
        this.props.onMenuClick(e);
    }
    onEdit(key, action) {
        this.props.onEdit(key, action);
    }
    render() {
        let activeKey = this.props.activeKey;
        let items = this.props.items;
        return (
            <Content style={{ margin: '10px 5px 5px 5px', background: '#fff' }}>
                <Tabs hideAdd
                    animated={true}
                    type="editable-card"
                    activeKey={activeKey}
                    onChange={this.onMenuClick.bind(this)}
                    onEdit={this.onEdit.bind(this)}
                >
                    {
                        // pane.name
                        items.map(pane =>
                            <TabPane tab={<span style={{ padding: 10 }}>{pane.name}</span>} key={pane.id}>
                                <User />
                            </TabPane>)
                    }
                </Tabs>
            </Content>
        );

    }
}

export default ContentTab;