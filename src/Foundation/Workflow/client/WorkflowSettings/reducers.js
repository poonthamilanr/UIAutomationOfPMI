import * as actions from "./actions";

const initialState = null;

const workflowStepsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case actions.SET_WORKFLOW_STEPS:
    return action.payload;
  default:
    return state;
  }
};

export default workflowStepsReducer;