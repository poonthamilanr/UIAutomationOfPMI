import { createAction } from "redux-actions";

export const SET_WORKFLOW_STEPS = "SET_WORKFLOW_STEPS";

export const setWorkflowSteps = createAction(SET_WORKFLOW_STEPS, data => data);