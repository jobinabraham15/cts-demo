const initialState = {
  list: {},
  workflow: {}
};

const gridReducer = (state = initialState, action) => {
  switch (action.type) {
    // Gets the list and converts into
    case "LIST_PUT":
      return {
        ...state,
        list: action.payload.data.reduce(
        (map, obj) => {
          map[obj.id] = obj;
          return map;
        }, 
        {})
      };

    case "WORKFLOW_PUT":
      return {
        ...state,
        workflow: {
          ...state.workflow,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export const gridSelector = {
  getList: state => {
    const { grid } = state;
    const dict = grid.list;
    return Object.keys(dict).map(key => dict[key]);
  }
};

export default gridReducer;
