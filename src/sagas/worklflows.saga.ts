import { stringToObject } from "utils/stringToObject";
import { put } from "../../node_modules/redux-saga/effects";
import { mapArrayToObject } from "utils/mapArrayToObject";

export interface IWorkflowPayload {
  api: Function;
  apiArgs: any;
}

export function* workflowFetch(action: any) {
  console.log("payload in workflow ffetch", action);
  const { api, apiArgs, key } = action.payload;
  const response = yield api(apiArgs);
  console.log("response in workflow fetch", response);
  // PUT into the workflow
  const normalizedData = mapArrayToObject(response.data.nodes.edges, "id");
  let workFlowPut = stringToObject({}, key.split("."), normalizedData);
  yield put({ type: "WORKFLOW_PUT", payload: workFlowPut });
}
