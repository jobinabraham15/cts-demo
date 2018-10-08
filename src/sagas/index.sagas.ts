import { takeLatest } from "../../node_modules/redux-saga/effects";
import { list } from "sagas/employee.saga";
import { workflowFetch, workFlowChange } from "sagas/worklflows.saga";
import { selectGridEntity } from "sagas/grid.saga";

// const fetchGridList = (action) => {
//     const actionType = action.type;
//     const actionEntity = actionType.split(/_(.+)/)[1];

// };

// export function* sagas(){
//     yield [
//         fork(takeLatest, "GRIDLIST_EMPLOYEE", fetchGridList)
//     ]
// }

export function* sagas() {
  yield [
    takeLatest("GRIDLIST_EMPLOYEE", list),
    takeLatest("GRIDSELECT_ENTITY", selectGridEntity),
    takeLatest("WORKFLOW_FETCH", workflowFetch),
    takeLatest("WORKFLOW_CHANGE", workFlowChange)
  ];
}
