import React from 'react';
import { Layout } from 'antd';
import HeaderBar from '../../js/components/HeaderBar/index'
import Sidebar from '../../js/components/Sidebar/index'
import ContentTab from '../../js/components/ContentTab/index'
import FooterBar from '../../js/components/FooterBar/index'
import sidebarMenu from '../../view/menu/menu'
import './index.css'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      tabs: {
        activeKey: "",
        defaultActiveKey: "",
        items: []
      },
      menu: {
        items: sidebarMenu
      }
    };
    this.onCollapse = this.onCollapse.bind(this);
  }
  onCollapse(collapsed) {
    this.setState({ collapsed });
  }
  onMenuClick(e) {
    let id = e;
    let tabactiveKey = "";
    this.state.tabs.items.map(item => {
      if (item.id == id) {
        tabactiveKey = item.id
        return;
      }
    });
    let tabData = {};
    this.state.menu.items.map(item => {
      item.childNode.map(subitem => {
        if (subitem.id == id) {
          tabData = subitem;
          return;
        }
      })
    });
    var tabsitem = this.state.tabs.items;
    if (tabactiveKey == "") {
      tabsitem.push(tabData);
    }
    this.setState({
      tabs: {
        activeKey: id,
        items: tabsitem
      }
    });
  }
  onEdit(key, action) {
    this[action](key);
  }
  remove(targetKey) {
    let activeKey = this.state.tabs.activeKey;
    let lastIndex;
    this.state.tabs.items.forEach((pane, i) => {
      if (pane.id === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.tabs.items.filter(pane => pane.id !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].id;
      } else {
        activeKey = panes[0].id;
      }
    }
    this.setState({
      tabs: {
        items: panes, activeKey
      }
    });
  }
  render() {
    let menu = this.state.menu.items;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar menu={menu}
          collapsed={this.state.collapsed}
          onMenuClick={this.onMenuClick.bind(this)}
          onCollapse={this.onCollapse.bind(this)} />
        <Layout>
          <HeaderBar />
          <ContentTab items={this.state.tabs.items}
            activeKey={this.state.tabs.activeKey}
            onMenuClick={this.onMenuClick.bind(this)}
            onEdit={this.onEdit.bind(this)} />
          <FooterBar />
        </Layout>
      </Layout >
    );
  }
}

export default Home;