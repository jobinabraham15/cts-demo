const initialState = {
  list: {},
  selected: {},
  workflow: {},
  workflows: {}
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
    case "SELECTED_ENTITY_PUT": {
      return {
        ...state,
        selected: {
          id: action.payload.id
        }
      };
    }
    case "WORKFLOWS_PUT": {
      return {
        ...state,
        workflows: action.payload.workflows
      };
    }
    case "WORKFLOW_PUT":
      return {
        ...state,
        workflow: {
          ...state.workflow,
          ...action.payload
        }
      };
    case "WORKFLOW_CHANGE": {
      return {
        ...state,
        workflow:
          action.payload && action.payload.id
            ? {
                id: action.payload.id
              }
            : initialState.workflow
      };
    }
    default:
      return state;
  }
};

export const gridSelector = {
  getList: state => {
    const { grid } = state;
    const dict = grid.list;
    return Object.keys(dict).map(key => dict[key]);
  },
  getActiveWorkFlow: state => {
    const { id } = state.grid.workflow;
    return { ...state.grid.workflows[id] };
  },
  getSelectedEntity: state => {
    const { id } = state.grid.selected;
    return { ...state.grid.list[id] };
  }
};

export default gridReducer;
