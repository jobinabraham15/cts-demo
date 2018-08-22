import * as React from "react";
import { connect } from "react-redux";
import { IListPageProps } from "pages/common/types";
import { gridSelector } from "reducers/grid/grid.reducer";
import ListingTable from "components/common/ListingTable.component";
import { IListingTableColumn } from "components/common/types";
import { Col, Row } from "antd";
import Workflow from "components/common/Workflow.Component";
import employeeWorkflows from "pages/employee/employee.workflows";

// TODO: Can we use render props to make the list page into reusable components????

const mapStateToProps = (state, ownProps) => {
  return {
    list: gridSelector.getList(state),
    workflow: state.grid.workflow
  };
};

const mapDispatchToProps = dispatch => ({
  getList: (payload) => {
    dispatch({
      type: "GRIDLIST_EMPLOYEE",
      payload
    });
  }
});

const columns: Array<IListingTableColumn> = [
  {
    title: "name",
    dataIndex: "first_name",
    key: "first_name"
  }
];

class EmployeeListPage extends React.Component<IListPageProps> {
  componentDidMount() {
    this.props.getList({
      workflow: "workflow_1"
    });
  }

  render() {
    const { list } = this.props;
    const activeWorkFlow = employeeWorkflows[this.props.workflow.id];
    console.log("activeWorkFlow", activeWorkFlow);
    return (
      <>
        <Row>
          <Col span={14}>
            <ListingTable columns={columns} data={list} />
          </Col>
          <Col span={10}>
            {/* <Workflow active={activeWorkFlow} data={this.props.workflow}/> */}
            {activeWorkFlow ? <Workflow active={activeWorkFlow} data={this.props.workflow} /> : null }
          </Col>
        </Row>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeListPage);
