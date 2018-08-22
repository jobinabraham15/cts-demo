import EmployeeCandidateWorkflow from "components/employee/EmployeeCandidateWorkflow.component";
import EmployeeApi from "apis/employee";

const employeeWorkflows = {
  workflow_1: {
    render: EmployeeCandidateWorkflow,
    createDataFn: workflowState => {
      console.log("workflowstate", workflowState);
      return workflowState.relatedJobs;
    },
    fetch: EmployeeApi.get,
    key: "relatedJobs"
  }
};

export default employeeWorkflows;
