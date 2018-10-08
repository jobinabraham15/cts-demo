import EmployeeApi from "apis/employee";
import { put, all } from "../../node_modules/redux-saga/effects";

export function* list(action: any) {
  console.log("payload in list", action);
  const { default_workflow, workflows } = action.payload;
  const response = yield EmployeeApi.get();
  yield put({
    type: "WORKFLOWS_PUT",
    payload: {
      workflows
    }
  });
  yield all([
    put({
      type: "LIST_PUT",
      payload: {
        data: response.data.nodes.edges.map(item => item)
      }
    }),
    yield put({
      type: "WORKFLOW_PUT",
      payload: {
        id: default_workflow
      }
    })
  ]);
  
  // Put the response in reducer actions
  // yield put({
  //   type: "LIST_PUT",
  //   payload: {
  //     data: response.data.nodes.edges.map((item) => item)
  //   }
  // });
}
