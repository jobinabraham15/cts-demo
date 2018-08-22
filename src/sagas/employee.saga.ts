import EmployeeApi from "apis/employee";
import { put, all } from "../../node_modules/redux-saga/effects";

export function* list(action: any) {
  console.log("payload in list", action);
  const { workflow } = action.payload;
  const response = yield EmployeeApi.get();
  yield all([
    put({
      type: "LIST_PUT",
      payload: {
        data: response.data.nodes.edges.map(item => item)
      }
    }),
    put({
      type: "WORKFLOW_PUT",
      payload: {
        id: workflow
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
