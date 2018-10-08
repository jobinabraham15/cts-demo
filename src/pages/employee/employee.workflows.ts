import EmployeeCandidateWorkflow from "components/employee/EmployeeCandidateWorkflow.component";
import EmployeeApi from "apis/employee";

const employeeWorkflows = {
  workflow_1: {
    render: EmployeeCandidateWorkflow,
    createDataFn: state => {
      return state.relatedJobs;
    },
    buildArgs: row => {
      return {
        Employee: {
          AND: {
            candidate_id: row.candidate_id
          }
        }
      };
    },
    fetch: EmployeeApi.get,
    key: "relatedJobs"
  }
};

export default employeeWorkflows;
