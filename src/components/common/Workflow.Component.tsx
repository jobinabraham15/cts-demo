import * as React from "react";
import { Card } from "antd";

export interface IWorkFlowCompProps {
  render?: Function;
  data?: any;
  active?: any;
  fetchData?: (payload?: any) => void;
  select: () => any;
}

class Workflow extends React.Component<IWorkFlowCompProps> {
  createData = data => this.props.active.createDataFn(data);
  render() {
    const WorkflowComponent = this.props.active.render;
    const data = this.createData(this.props.data);
    return (
      <Card title={'Workflow'} extra={this.props.select()}>
        <WorkflowComponent data={data} />
      </Card>
    );
  }
}

export default Workflow;
