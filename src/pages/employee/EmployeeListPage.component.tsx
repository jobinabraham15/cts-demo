import * as React from "react";
import { connect } from "react-redux";
import { IListPageProps } from "pages/common/types";
import { gridSelector } from "reducers/grid/grid.reducer";
import ListingTable from "components/common/ListingTable.component";
import { IListingTableColumn } from "components/common/types";
import { Col, Row } from "antd";
import Workflow from "components/common/Workflow.Component";
import employeeWorkflows from "pages/employee/employee.workflows";
import WorkflowSelect from "components/common/WorkflowSelect.component";

// TODO: Can we use render props to make the list page into reusable components????

const mapStateToProps = (state, ownProps) => {
  return {
    list: gridSelector.getList(state),
    workflow: state.grid.workflow
  };
};

const mapDispatchToProps = dispatch => ({
  getList: payload => {
    dispatch({
      type: "GRIDLIST_EMPLOYEE",
      payload
    });
  },
  selectRow: id => {
    dispatch({
      type: "GRIDSELECT_ENTITY",
      payload: {
        id
      }
    });
  },
  fetchWorkflowData: payload => {
    dispatch({
      type: "WORKFLOW_FETCH",
      payload
    });
  },
  fetchWorkflowChange: payload => {
    dispatch({
      type: "WORKFLOW_CHANGE",
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
      default_workflow: "workflow_1",
      workflows: employeeWorkflows
    });
  }

  onRowSelected = (row: any) => {
    this.props.selectRow(row.id);
  };

  onWorkFlowChange = ({ key }) => {
    console.log("recor");
  };

  render() {
    const { list } = this.props;
    const activeWorkFlow = employeeWorkflows[this.props.workflow.id];
    const workFlowData = this.props.workflow;
    const workFlowOptions = Object.keys(employeeWorkflows).map(key => ({
      display: key,
      value: key
    }));

    // Change the workflowrelated data from redux store to array. The component needs to know in advance about the keys required by the workflow component
    // Todo: Can we somehow configure the shape of data in the workflowconfig
    if (workFlowData.relatedJobs) {
      workFlowData.relatedJobs = Object.keys(workFlowData.relatedJobs).map(
        key => workFlowData.relatedJobs[key]
      );
    }

    return (
      <>
        <Row>
          <Col span={14}>
            <ListingTable
              columns={columns}
              data={list}
              onRowSelected={this.onRowSelected}
            />
          </Col>
          <Col span={10}>
            {/* <Workflow active={activeWorkFlow} data={this.props.workflow}/> */}
            {activeWorkFlow ? (
              <Workflow
                active={activeWorkFlow}
                data={workFlowData}
                select={() => (
                  <WorkflowSelect
                    items={workFlowOptions}
                    onChange={this.onWorkFlowChange}
                  />
                )}
              />
            ) : null}
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
