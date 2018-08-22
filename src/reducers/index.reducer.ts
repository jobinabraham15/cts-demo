import gridReducer from "reducers/grid/grid.reducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    grid: gridReducer
});

export default allReducers;