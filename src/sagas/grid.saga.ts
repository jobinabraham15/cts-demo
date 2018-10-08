import { put } from "redux-saga/effects";

export function* selectGridEntity(action: any) {
  const { id } = action.payload;

  // First Change the selected entity
  yield put({
    type: "SELECTED_ENTITY_PUT",
    payload: {
      id
    }
  });

  yield put({
    type: "WORKFLOW_FETCH",
    payload: {}
  });
}
