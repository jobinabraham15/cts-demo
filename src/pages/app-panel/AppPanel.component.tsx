import * as React from "react";
import { Layout } from "antd";
import { Route } from "react-router";
import EmployeeListPage from "pages/employee/EmployeeListPage.component.tsx";
import { Switch } from "react-router-dom";

const { Header, Content, Footer } = Layout;
class AppPanel extends React.Component {
  render() {
    return (
      <>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Switch>
              <Route
                exact={true}
                path="/"
                component={EmployeeListPage}
              />
            </Switch>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            Bill is a cat.
          </div> */}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </>
    );
  }
}

export default AppPanel;
