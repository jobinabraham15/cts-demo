import * as React from "react";

export interface IEmpCandWF {
  data: any;
}

class EmployeeCandidateWorkflow extends React.Component<IEmpCandWF> {
  
  render() {
    console.log("props in EmployeeCandidateWorkflow", this.props);
    return <div>EmployeeCandidateWorkflow</div>;
  }
}

export default EmployeeCandidateWorkflow;
