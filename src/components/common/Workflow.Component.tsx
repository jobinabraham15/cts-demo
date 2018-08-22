import * as React from "react";
import { connect } from "react-redux";

export interface IWorkFlowCompProps {
  render?: Function;
  data?: any;
  active?: any;
  fetchData: (payload?: any) => void;
}
const mapDispatchToProps = dispatch => ({
  // fetchData: payload => {
  //   dispatch({
  //     type: "WORKFLOW_FETCH",
  //     payload
  //   });
  // }
});

class Workflow extends React.Component<IWorkFlowCompProps> {
  componentDidMount() {
    console.log("this.props.active.fetch", this.props.active.fetch);
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
