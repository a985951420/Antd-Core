import React from 'react';
import './index.css'
import { Layout, Tabs } from 'antd';
const { Content } = Layout;
const TabPane = Tabs.TabPane;
class ContentTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
        };
        this.resize = this.resize.bind(this);
    }
    componentDidMount() {
        this.screenChange();
        setTimeout(() => {
            this.resize(this);
        }, 100);
    }
    screenChange() {
        window.addEventListener('resize', this.resize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }
    resize(e) {
        var d = document.getElementById('ContentContainer');
        var h = d.clientHeight;//d.offsetHeight;//d.clientHeight ||
        this.setState({ height: h });
        console.log(h);
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
            <Content id='ContentContainer' style={{ margin: '5px 5px 5px 5px', background: '#fff' }} >
                <Tabs hideAdd
                    animated={true}
                    type="editable-card"
                    activeKey={activeKey}
                    onChange={this.onMenuClick.bind(this)}
                    onEdit={this.onEdit.bind(this)}
                    style={{ overflow: "auto", height: this.state.height }}
                >
                    {
                        items.map(pane => {
                            return (
                                <TabPane tab={<span style={{ padding: 5 }}>{pane.name}</span>} key={pane.id}>
                                    <div style={{ height: (this.state.height - 57), border: "1px sold red", overflowY: "auto", overflowX: "hidden" }}>
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


