import React from 'react';
import './index.css'
import { Layout } from 'antd';
import HeaderBar from '../../js/components/HeaderBar/index'
import Sidebar from '../../js/components/Sidebar/index'
import ContentTab from '../../js/components/ContentTab/index'
import FooterBar from '../../js/components/FooterBar/index'
import { GetMenu } from '../../view/menu/menu'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      height: 0,
      tabs: {
        activeKey: "",
        defaultActiveKey: "",
        items: []
      },
      menu: {
        items: []
      }
    };
    this.onCollapse = this.onCollapse.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }
  componentWillMount() {
    window.addEventListener('resize', this.onWindowResize);
    setTimeout(() => {
      this.setState({ height: document.body.clientHeight });
    }, 100);

    GetMenu((AuthorizedMenu) => {
      this.setState({
        menu: {
          items: AuthorizedMenu
        }
      });
    })
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }
  onWindowResize(e) {
    var a = document.body.clientHeight;
    console.log("height：" + a)
    this.setState({
      height: a,
    });
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
    setTimeout(() => {
      this.setState({
        tabs: {
          items: panes, activeKey
        }
      });
    }, 100);
  }
  render() {
    let menu = this.state.menu.items;
    return (
      <Layout style={{ minHeight: this.state.height, background: '#fff' }}>
        <Sidebar menu={menu}
          collapsed={this.state.collapsed}
          onMenuClick={this.onMenuClick.bind(this)}
          onCollapse={this.onCollapse.bind(this)} />
        <Layout>
          <HeaderBar {...this.props} />
          <ContentTab {...this.props} items={this.state.tabs.items}
            activeKey={this.state.tabs.activeKey}
            onMenuClick={this.onMenuClick.bind(this)}
            onEdit={this.onEdit.bind(this)} />
          {/* <FooterBar  {...this.props} /> */}
        </Layout>
      </Layout >
    );
  }
}

export default Home;