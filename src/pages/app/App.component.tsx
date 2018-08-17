import * as React from "react";
import "pages/app/App.css";
import { Layout, Menu, Icon } from "antd";
import AppPanel from "pages/app-panel/AppPanel.component";

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;
// import logo from 'logo.svg';

class App extends React.Component {
  public render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsed={true}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <AppPanel />
        </Layout>
      </Layout>
    );
  }
}

export default App;
