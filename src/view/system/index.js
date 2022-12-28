import React from "react";
import { Layout, Tree, Button, Table } from "antd";
import { GetMenu } from "../menu/menu";
import HttpClient from "../../api/httpClient";
import { menuListUrl } from "../../api/apiConfig";
import Dialog from "../../js/components/Dialogs/index";
import WrappedNormalAddMenuFrom from "./addMenu";
const { Sider, Content } = Layout;
const { TreeNode } = Tree;

const columns = [
  {
    title: "序号",
    render(text, record, index) {
      // (text, record, index) => `${index + 1}`
      return index + 1;
    },
  },
  {
    title: "名称",
    dataIndex: "meun",
    width: "20%",
  },
  {
    title: "ViewCode",
    dataIndex: "viewcode",
    width: "20%",
  },
  {
    title: "类型",
    dataIndex: "type",
    width: "20%",
    render: (value) => {
      return value == 1 ? "菜单" : "按钮";
    },
  },
  {
    title: "描述",
    width: "20%",
    dataIndex: "description",
  },
  {
    title: "有效",
    dataIndex: "isactivate",
    render: (value) => {
      return value ? "是" : "否";
    },
  },
];

class Authority extends React.Component {
  constructor() {
    super();
    this.state = {
      tree: null,
      data: [],
      pagination: {},
      loading: false,
      viewcode: "",
      selectTreeName: "",
      dialog: false,
      addButton: true,
    };
  }
  componentDidMount() {
    GetMenu((AuthorizedMenu) => {
      this.setState({
        tree: AuthorizedMenu,
      });
    }, true);
  }
  query(params = {}) {
    console.log("params:", params);
    this.setState({ loading: true });
    HttpClient.post(menuListUrl, {
      results: 10,
      ...params,
      viewcode: this.state.viewcode,
    }).then((response) => {
      const pagination = { ...this.state.pagination };
      pagination.total = response.totalNumber;
      this.setState({
        loading: false,
        data: response.data,
        pagination,
      });
    });
  }
  handleTableChange(pagination, filters, sorter) {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.query({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  renderTreeNodes(data) {
    if (data == null) return;
    var nodes = data.map((item) => {
      console.log(item.id);
      if (item.childNode) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.childNode)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.id} title={item.name} {...item} />;
    });
    return nodes;
  }
  onSelect(key, e) {
    if (key.length == 0) return;
    this.setState({
      viewcode: key[0],
      selectTreeName: e.node.props.title,
      pagination: {
        current: 1,
      },
      addButton: false,
    });
    setTimeout(() => {
      this.query();
    }, 100);
  }
  addMenu() {
    this.setState({
      dialog: true,
    });
  }
  handleOk(e) {
    this.setState({
      dialog: false,
    });
  }
  handleCancel(e) {
    this.setState({
      dialog: false,
    });
  }
  render() {
    return (
      <Layout style={{ background: "#fff", height: "100%" }}>
        <Sider style={{ background: "#fff" }}>
          <Tree
            showLine
            onSelect={this.onSelect.bind(this)}
            style={{ padding: 5 }}
          >
            <TreeNode key="node" title="菜单">
              {this.renderTreeNodes(this.state.tree)}
            </TreeNode>
          </Tree>
        </Sider>
        <Content>
          <Dialog
            title={"添加【" + this.state.selectTreeName + "】"}
            visible={this.state.dialog}
            handleOk={this.handleOk.bind(this)}
            handleCancel={this.handleCancel.bind(this)}
          >
            <WrappedNormalAddMenuFrom viewCode={this.state.viewcode} />
          </Dialog>
          <div style={{ padding: 5 }}>
            <Button
              disabled={this.state.addButton}
              type="primary"
              onClick={this.addMenu.bind(this)}
            >
              添加
              {this.state.selectTreeName == ""
                ? "菜单"
                : this.state.selectTreeName}
            </Button>
            <Table
              bordered
              columns={columns}
              rowKey={(record) => {
                return record.viewcode;
              }}
              dataSource={this.state.data}
              pagination={this.state.pagination}
              loading={this.state.loading}
              onChange={this.handleTableChange.bind(this)}
              // scroll={{ y: 410 }}
            />
          </div>
        </Content>
      </Layout>
    );
  }
}
export default Authority;
