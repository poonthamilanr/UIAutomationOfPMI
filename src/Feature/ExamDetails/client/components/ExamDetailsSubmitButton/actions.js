import { createAction } from "redux-actions";

export const SUBMIT_APP_INITIATED_SET = "SUBMIT_APP_INITIATED_SET";
export const SUBMIT_APP_INITIATED_RESET = "SUBMIT_APP_INITIATED_RESET";

export const setSubmitAppInitiated = createAction(SUBMIT_APP_INITIATED_SET);
export const resetSubmitAppInitiated = createAction(SUBMIT_APP_INITIATED_RESET);