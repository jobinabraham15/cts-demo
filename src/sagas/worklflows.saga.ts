import { stringToObject } from "utils/stringToObject";
import { put, select } from "redux-saga/effects";
import { mapArrayToObject } from "utils/mapArrayToObject";
import { gridSelector } from "reducers/grid/grid.reducer";

export interface IWorkflowPayload {
  api: Function;
  apiArgs: any;
}

// Select active workFlow id from the reducer, pass the selectedEntity to buildArgs fn, and do the fetch
export function* workflowFetch(action: any) {
  const activeWorkflow = yield select(gridSelector.getActiveWorkFlow);
  const selectedEntity = yield select(gridSelector.getSelectedEntity);
  const { fetch: api, buildArgs, key } = activeWorkflow;
  const apiArgs = buildArgs(selectedEntity);
  const response = yield api(apiArgs);
  // PUT into the workflow
  const normalizedData = mapArrayToObject(response.data.nodes.edges, "id");
  let workFlowPut = stringToObject({}, key.split("."), normalizedData);
  yield put({ type: "WORKFLOW_PUT", payload: workFlowPut });
}

export function* workFlowChange(action: any) {
  const { id, fetch, buildArgs, key } = action.payload;
  const workflowPayload = { id };

  yield put({
    type: "WORKFLOW_CHANGE",
    payload: workflowPayload
  });
  const fetchPayload = {
    api: fetch,
    apiArgs: buildArgs(action.payload.component.entity),
    key: key
  };
  yield put({
    type: "WORKFLOW_FETCH",
    payload: fetchPayload
  });
}
