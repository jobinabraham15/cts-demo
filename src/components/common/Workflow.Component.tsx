import * as React from "react";
import { connect } from "react-redux";

export interface IWorkFlowCompProps {
  render?: Function;
  data?: any;
  active?: any;
  fetchData: (payload?: any) => void;
}
const mapDispatchToProps = dispatch => ({
  fetchData: payload => {
    dispatch({
      type: "WORKFLOW_FETCH",
      payload
    });
  }
});

class Workflow extends React.Component<IWorkFlowCompProps> {
  componentDidMount() {
    console.log("this.props.active.fetch", this.props.active.fetch);
    this.props.fetchData({
      api: this.props.active.fetch,
      apiArgs: {
        Employee: {
          AND: {
            candidate_id: "b4d2d747-91e9-4a35-9038-ea288169f192"
          }
        }
      },
      key: this.props.active.key
    });
  }
  createData = (data) => this.props.active.createDataFn(data);
  render() {
    const WorkflowComponent = this.props.active.render;
    const data = this.createData(this.props.data);
    return (
      <>
        <WorkflowComponent data={data} />
      </>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Workflow);
