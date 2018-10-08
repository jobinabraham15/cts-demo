import * as React from "react";
import { List, Row, Col } from "antd";

export interface IEmpCandWF {
  data: any;
}

class EmployeeCandidateWorkflow extends React.Component<IEmpCandWF> {
  render() {
    console.log("props in EmployeeCandidateWorkflow", this.props);
    const { data } = this.props;
    return (
      <List
        dataSource={data}
        renderItem={item => (
          <List.Item
            actions={[
              <a key={"show_more"}>Show More Info</a>,
              <a key={"show_other"}>Some Other info</a>
            ]}
          >
            <List.Item.Meta
              title={item.organization.popular_name}
              description={item.first_name + " " + item.last_name}
            />
            <Row>
              <Col>{item.mobile}</Col>
              <Col>{item.email}</Col>
            </Row>
          </List.Item>
        )}
      />
    );
  }
}

export default EmployeeCandidateWorkflow;
